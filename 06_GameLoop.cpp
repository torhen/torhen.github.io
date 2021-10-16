#include <windows.h>

const int BMP_WIDTH = 160;
const int BMP_HEIGHT = 90;
BITMAPINFO gBmi;
UINT32 gPixels[BMP_WIDTH * BMP_HEIGHT];

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {

	PAINTSTRUCT ps;
	HDC hDC;

	switch (Msg) {
	case WM_CREATE:
		gBmi = {};
		gBmi.bmiHeader.biSize = sizeof(gBmi.bmiHeader);
		gBmi.bmiHeader.biPlanes = 1;
		gBmi.bmiHeader.biBitCount = 32;
		gBmi.bmiHeader.biWidth = BMP_WIDTH;
		gBmi.bmiHeader.biHeight = BMP_HEIGHT;

		return 0;

	case WM_DESTROY:
		PostQuitMessage(0);
	}

	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {

	WNDCLASS wc = {};
	HWND hWnd;
	RECT cr;
	static int iCount = 0;

	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_WINDOW_CLASS";
	wc.style = CS_VREDRAW | CS_HREDRAW;

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Could not register class", 0, 0);
		return 0;
	}

	hWnd = CreateWindow(L"MY_WINDOW_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE,
		CW_USEDEFAULT, CW_USEDEFAULT, BMP_WIDTH * 8, BMP_HEIGHT * 8, 0, 0, hInstance, 0);

	MSG msg;
	while (1) {
		while (PeekMessage(&msg, 0, 0, 0, PM_REMOVE)) {
			if (msg.message == WM_QUIT) {
				return 0;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}

		// Set pixel
		for (int i = 0; i < BMP_WIDTH * BMP_HEIGHT; i++) {
			gPixels[i] = RGB(rand(), rand(), rand());
		}

		//Draw bitmap
		GetClientRect(hWnd, &cr);
		HDC hDC = GetDC(hWnd);
		StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, BMP_WIDTH, BMP_HEIGHT, &gPixels, &gBmi, 0, SRCCOPY);
		TCHAR buffer[100];
		iCount++;
		wsprintf(buffer, L"%d k frames", iCount/1000);
		DrawText(hDC, buffer, -1, &cr, 0);
		ReleaseDC(hWnd, hDC);
	}

	return 0;
}