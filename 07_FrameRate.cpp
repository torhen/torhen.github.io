#include <windows.h>
#include <stdio.h>

// define dimension and framerate
const int BMPW = 20;
const int BMPH = 20;
int gFrameRate =  2;

BITMAPINFO gBmi;
UINT32 gPixel[BMPW * BMPH];
long int gFrameCount = 0;

int update() {
	int n = gFrameCount % BMPW;
	for(int y = 0; y < BMPH; y++) {
		for (int x = 0; x < BMPW; x++) {
			gPixel[x + y * BMPW] = RGB(rand(), rand(), rand());
		}
	}
	return 0;
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {

	PAINTSTRUCT ps;
	HDC hDC;
	RECT cr;

	switch (Msg) {
	case WM_CREATE:
		// initialize BITMAPINFO
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
	LARGE_INTEGER liSecond, liStart, liNow;

	// Register window class
	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";

	if (RegisterClass(&wc) == 0) {
		MessageBox(0, L"Could not register class", 0, 0);
		return 0;
	}

	// Create Window
	hWnd = CreateWindow(L"MY_CLASS", L"Constant Frame Rate", WS_OVERLAPPEDWINDOW | WS_VISIBLE, 
		CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	// Get frequency of performance counter
	QueryPerformanceFrequency(&liSecond);

	while(1) {

		// Get start value of performance counter
		QueryPerformanceCounter(&liStart);

		// process all messages in queue
		while (PeekMessage(&msg, 0, 0, 0, PM_REMOVE)) {
			if (msg.message == WM_QUIT) {
				return 0;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}

		// update buffer
		gFrameCount++;
		update();

		// display buffer
		hDC = GetDC(hWnd);
		GetClientRect(hWnd, &cr);
		StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, BMPW, BMPH, gPixel, &gBmi, 0, SRCCOPY);
		ReleaseDC(hWnd, hDC);

		// loop until the target time of frame is reached
		while (1) {
			QueryPerformanceCounter(&liNow);
			Sleep(0);
			if (liNow.QuadPart > liStart.QuadPart + liSecond.QuadPart / gFrameRate) {
				break;
			}
		}
	}
	return 0;
}