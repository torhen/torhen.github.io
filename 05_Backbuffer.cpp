#include <windows.h>

const int gBmpWidth = 100;
const int gBmpHeight = 100;
BITMAPINFO gBmi;
UINT32 gPixels[gBmpWidth * gBmpHeight];

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {

	PAINTSTRUCT ps;
	HDC hDC;
	RECT cr;

	switch (Msg) {

	case WM_CREATE:
		gBmi = {};
		gBmi.bmiHeader.biSize = sizeof(gBmi.bmiHeader);
		gBmi.bmiHeader.biPlanes = 1;
		gBmi.bmiHeader.biBitCount = 32;
		gBmi.bmiHeader.biWidth = gBmpWidth;
		gBmi.bmiHeader.biHeight = gBmpHeight;

		return 0;

	case WM_PAINT:
		hDC = BeginPaint(hWnd, &ps);

		for (int i = 0; i < gBmpWidth * gBmpHeight; i++) {
			gPixels[i] = RGB(rand(), rand(), rand());
		}

		GetClientRect(hWnd, &cr);
		if (StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, gBmpWidth, gBmpHeight, gPixels, &gBmi, 0, SRCCOPY) == 0) {
			MessageBox(0, L"StretchDIBs failed", 0, 0);
			return 0;
		}
		EndPaint(hWnd, &ps);
		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
	}

	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {

	WNDCLASS wc = {};
	HWND hWnd;

	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_WINDOW_CLASS";
	wc.style = CS_VREDRAW | CS_HREDRAW;

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Could not register class", 0, 0);
		return 0;
	}

	hWnd = CreateWindow(L"MY_WINDOW_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, 
		CW_USEDEFAULT, CW_USEDEFAULT, gBmpWidth * 5, gBmpHeight * 5 , 0, 0, hInstance, 0);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	return 0;
}