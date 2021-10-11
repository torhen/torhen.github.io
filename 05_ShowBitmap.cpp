#include <windows.h>
//http://www.winprog.org/tutorial/bitmaps.html


HBITMAP g_bitmap;

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {


	PAINTSTRUCT ps;
	HDC hDC;
	RECT rect = { 10, 10, 100, 100 };
	HBITMAP hbmOld;

	BITMAP bm;

	HDC hdc;
	HDC hdcMem;

	TCHAR buffer[MAX_COMPUTERNAME_LENGTH + 1];
	DWORD size = sizeof(buffer) / sizeof(buffer[0]);
	GetComputerNameW(buffer, &size);
	switch (Msg) {
	case WM_CREATE:
		g_bitmap = (HBITMAP)LoadImage(0, L"C:\\test\\test.bmp", IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE);

		if (g_bitmap) {
			GetObject((HGDIOBJ)g_bitmap, sizeof(bm), &bm);
		}
		else {
			MessageBox(0, L"Could not load BMP", 0, 0);
		}

		


	case WM_PAINT:

		hdc = BeginPaint(hWnd, &ps);

		hdcMem = CreateCompatibleDC(hdc);

		if (g_bitmap) {
			SelectObject(hdcMem, g_bitmap);
		}

		BitBlt(hdc, 10, 10, bm.bmWidth, bm.bmHeight, hdcMem, 0, 0, SRCCOPY);

		DeleteDC(hdcMem);

		EndPaint(hWnd, &ps);
		return 0;

	case WM_DESTROY:
		PostQuitMessage(0);
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int _stdcall WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ char*, _In_ int) {

	WNDCLASS wc = {};
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";
	wc.hInstance = hInstance;
	wc.hbrBackground = (HBRUSH)GetStockObject(LTGRAY_BRUSH);

	if (RegisterClass(&wc) == 0) {
		MessageBox(0, L"Could not register class.", 0, 0);
	}

	CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW|WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 600, 600, 0, 0, hInstance, 0);
	
	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return 0;
}