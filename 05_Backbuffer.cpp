#include <windows.h>

BITMAPINFO g_bmi;
UINT32 *pixel_array;

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	PAINTSTRUCT ps = {};
	HDC hDC;
	RECT cr;
	// Bitmap dimensions
	int w = 10, h = 10;

	switch (Msg) {
	case WM_CREATE:
		g_bmi.bmiHeader = {};
		g_bmi.bmiHeader.biSize = sizeof(g_bmi.bmiHeader);
		g_bmi.bmiHeader.biWidth = w;
		g_bmi.bmiHeader.biHeight = h;
		g_bmi.bmiHeader.biBitCount = 32;
		g_bmi.bmiHeader.biPlanes = 1;

		pixel_array = new UINT32[w * h];
		// set first pixel to blue
		pixel_array[0] = 0x000000FF;
		
	case WM_PAINT:
		hDC = BeginPaint(hWnd, &ps);

		GetClientRect(hWnd, &cr);
		StretchDIBits(hDC, cr.left, cr.top, cr.right, cr.bottom, 0, 0, w, h, pixel_array, &g_bmi, 0, SRCCOPY);

		EndPaint(hWnd, &ps);

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
	wc.style = CS_HREDRAW | CS_VREDRAW;
	RegisterClass(&wc);

	CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return 0;
}