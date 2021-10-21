#include <windows.h>

const int BMPW = 10;
const int BMPH = 10;
int gFrameRate = 2;

long int gFrameCount;
UINT32 gPixel[BMPW * BMPH];


void draw_buffer(HDC hDC, int x, int y) {
	BITMAPINFO Bmi = {};
	Bmi.bmiHeader.biSize = sizeof(Bmi.bmiHeader);
	Bmi.bmiHeader.biWidth = BMPW;
	Bmi.bmiHeader.biHeight = -BMPH;
	Bmi.bmiHeader.biPlanes = 1;
	Bmi.bmiHeader.biBitCount = 32;
	gPixel[0] = 0xFFFF00FF * (gFrameCount % 2);
	StretchDIBits(hDC, 0, 0, x, y, 0, 0, BMPW, BMPH, gPixel, &Bmi, 0, SRCCOPY);
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	switch (Msg) {

	case WM_CLOSE:
	{
		PostQuitMessage(0);
	}return 0;
	}

	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {

	WNDCLASS wc = {};
	wc.lpfnWndProc = WndProc;
	wc.hInstance = hInstance;
	wc.lpszClassName = L"MY_CLASS";
	wc.style = CS_HREDRAW | CS_VREDRAW;
	wc.hCursor = LoadCursor(0, IDC_ARROW);

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Can't register Window Class", 0, 0);
		return 0;
	}

	HWND hWnd = CreateWindow(wc.lpszClassName, L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, 0, 0, 500, 500, 0, 0, hInstance, 0);

	MSG msg;
	HDC hDC;
	LARGE_INTEGER liSecond, liStart, liNow;
	QueryPerformanceFrequency(&liSecond);

	while (1) {
		QueryPerformanceCounter(&liStart);

		while (PeekMessage(&msg, 0, 0, 0, PM_REMOVE)) {
			if (msg.message == WM_QUIT) {
				return 0;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}

		gFrameCount++;
		hDC = GetDC(hWnd);
		RECT cr;
		GetClientRect(hWnd, &cr);
		draw_buffer(hDC, cr.right, cr.bottom);
		ReleaseDC(hWnd, hDC);


		while (1) {
			QueryPerformanceCounter(&liNow);
			if (liNow.QuadPart >= liStart.QuadPart + liSecond.QuadPart / gFrameRate) {
				break;
			}
			Sleep(0);
		}

	}

	return 0;
}