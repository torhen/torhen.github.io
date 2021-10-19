#include <windows.h>
#include <stdio.h>

const int BMPW = 20;
const int BMPH = 20;
int gFrameRate = 10;
BITMAPINFO gBmi;
UINT32 gPixel[BMPW * BMPH];
long int gFrameCount = 0;

int update() {

	// all pixels black
	for (int i = 0; i < BMPW * BMPH; i++) {
		gPixel[i] = 0;
	}

	// on pixel red
	int n = gFrameCount % (BMPW * BMPH);
	gPixel[n] = RGB(0, 0, 255);


	return 0;
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {

	PAINTSTRUCT ps;
	HDC hDC;
	RECT cr;

	switch (Msg) {
	case WM_CREATE:
		gBmi.bmiHeader.biSize = sizeof(gBmi.bmiHeader);
		gBmi.bmiHeader.biWidth = BMPW;
		gBmi.bmiHeader.biHeight = BMPH;
		gBmi.bmiHeader.biPlanes = 1;
		gBmi.bmiHeader.biBitCount = 32;
		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}

	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int iCmd) {

	HINSTANCE hInstance = GetModuleHandle(0);
	WNDCLASS wc = {};
	HWND hWnd;
	MSG msg;
	RECT cr;
	HDC hDC;
	LARGE_INTEGER start, curr, second;

	wc.hInstance = hInstance;
	wc.lpfnWndProc  = WndProc;
	wc.lpszClassName = L"MY_CLASS";

	if (RegisterClass(&wc) == 0) {
		MessageBox(0, L"Could not register class", 0, 0);
		return 0;
	}

	hWnd = CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	while (1) {

		// Get start value 
		QueryPerformanceCounter(&start);

		PeekMessage(&msg, 0, 0, 0, PM_REMOVE);
		TranslateMessage(&msg);
		DispatchMessage(&msg);

		if (msg.message == WM_QUIT) {
			return 0;
		}

		hDC = GetDC(hWnd);
		GetClientRect(hWnd, &cr);

		gFrameCount++;
		update();

		StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, BMPW, BMPH, gPixel, &gBmi, 0, SRCCOPY);
		ReleaseDC(hWnd, hDC);

		LARGE_INTEGER second;
		QueryPerformanceFrequency(&second);
		// wait till frame end
		while (1) {
			QueryPerformanceCounter(&curr);
			Sleep(0);
			if (curr.QuadPart > start.QuadPart + second.QuadPart / gFrameRate) {
				break;
			}
		}
	
	}

	return 0;
}