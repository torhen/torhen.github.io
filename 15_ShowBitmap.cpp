#include <windows.h>

HBITMAP g_hBitmap;

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	PAINTSTRUCT ps = {};
	HDC hDC, hdcMem;

	switch (Msg) {
	case WM_CREATE:
		g_hBitmap = (HBITMAP)LoadImage(0, L"test.bmp", IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE);
		if (g_hBitmap == 0) {
			MessageBox(0, L"Error loading bitmap", 0, 0);
		}

	case WM_PAINT:

		hDC = BeginPaint(hWnd, &ps);

		hdcMem = CreateCompatibleDC(hDC);
		SelectObject(hdcMem, g_hBitmap);
		BitBlt(hDC, 100, 100, 1000, 10000, hdcMem, 0, 0, SRCCOPY);

		DeleteDC(hdcMem);

		EndPaint(hWnd, &ps);
		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ char*, _In_ int) {
	WNDCLASS wc = {};
	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";
	wc.hbrBackground = (HBRUSH)GetStockObject(LTGRAY_BRUSH);

	RegisterClass(&wc);
	CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return 0;
}
