#include <windows.h>


BITMAPINFO g_bmi;
void* g_Memory;

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	PAINTSTRUCT ps = {};
	HDC hDC;
	RECT rect = { 10, 10, 100, 100 };

	switch (Msg) {
	case WM_CREATE:
		g_bmi.bmiHeader = {};
		g_bmi.bmiHeader.biSize = sizeof(g_bmi.bmiHeader);
		g_bmi.bmiHeader.biWidth = 640;
		g_bmi.bmiHeader.biHeight = 480;
		g_bmi.bmiHeader.biBitCount = 32;
		g_bmi.bmiHeader.biCompression = BI_RGB;
		g_bmi.bmiHeader.biPlanes = 1;
		g_Memory = VirtualAlloc(NULL, 640 * 480 * (32 / 8), MEM_RESERVE | MEM_COMMIT, PAGE_READWRITE);
		
		if(g_Memory) memset(g_Memory, 0x7F, 640 * 480 * (32 / 8));

	case WM_PAINT:
		hDC = BeginPaint(hWnd, &ps);
		StretchDIBits(hDC, 0, 0, 100, 100, 0, 0, 100, 100, g_Memory, &g_bmi, DIB_RGB_COLORS, SRCCOPY);
		EndPaint(hWnd, &ps);
		return 0; 

		if (g_Memory == 0) {
			MessageBox(0, L"Can not allocate memory", 0, 0);
		}
		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}

	return DefWindowProc(hWnd, Msg, wParam, lParam);
}


int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {

	WNDCLASS wc = {};
	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";
	wc.hbrBackground = CreateSolidBrush(RGB(255, 0, 255));

	RegisterClass(&wc);

	CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return 0;
}