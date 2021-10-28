#include <windows.h>
#include <time.h>

#pragma comment(lib, "winmm.lib") // for timeBeginPeriod

const int BMPW = 27;
const int BMPH = 9;
long int gFrameCount;
int gFrameRate = 1;
UINT32 gPixel[BMPW * BMPH];

void background() {
	int i;
	for (i = 0; i < BMPW * BMPH; i++) {
		gPixel[i] = 0x00000000;
	}
}

void number(int n, int px, int py) {
	
	const char* raster[5];

	//https://fontstruct.com/fontstructions/show/716744/3_by_5_pixel_font

	raster[0] = "###..#..##..###.#.#.###..##.###.###.###.";
	raster[1] = "#.#.##....#...#.#.#.#...#.....#.#.#.#.#.";
	raster[2] = "#.#..#...#..###.###.###.###..#..###.###.";
	raster[3] = "#.#..#..#.....#...#...#.#.#.#...#.#...#.";
	raster[4] = "###.###.###.###...#.###.###.#...###.##..";


	int x, y, x0, y0;
	for (y = 0; y < 5; y++) {
		for (x = 0; x < 4; x++) {
			if (raster[y][x+4 * n] == '#'){
				x0 = x + px;
				y0 = y + py;
				gPixel[x0 + y0 * BMPW] = 0xFF0000FF; // * (gFrameCount % 2);
			}
		}
	}
}

void update_buffer() {


	struct tm newtime;
	time_t now = time(0);
	localtime_s(&newtime, &now);
	int hour = newtime.tm_hour;
	int min = newtime.tm_min;
	int sec = newtime.tm_sec;

	int hour1 = hour / 10;
	int hour2 = hour % 10;

	int min1 = min / 10;
	int min2 = min % 10;

	int sec1 = sec / 10;
	int sec2 = sec % 10;

	background();
	number(hour1,  1, 2);
	number(hour2,  5, 2);

	number(min1, 10, 2);
	number(min2, 14, 2);

	number(sec1, 19, 2);
	number(sec2, 23, 2);

}


void draw_buffer(HWND hWnd, HDC hDC) {
	RECT cr;
	BITMAPINFO bmi = {};
	GetClientRect(hWnd, &cr);

	bmi.bmiHeader.biSize = sizeof(bmi.bmiHeader);
	bmi.bmiHeader.biWidth = BMPW;
	bmi.bmiHeader.biHeight = -BMPH;
	bmi.bmiHeader.biPlanes = 1;
	bmi.bmiHeader.biBitCount = 32;

	StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, BMPW, BMPH, gPixel, &bmi, 0, SRCCOPY);
}


LRESULT CALLBACK wnd_proc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	HDC hDC;
	PAINTSTRUCT ps;

	switch (Msg) {
	case WM_PAINT:
		hDC = BeginPaint(hWnd, &ps);
		draw_buffer(hWnd, hDC);
		EndPaint(hWnd, &ps);
		return 0;
	case WM_CLOSE:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {

	HINSTANCE hInstance = GetModuleHandle(0);
	WNDCLASS wc = {};
	HWND hWnd;
	HDC hDC;
	LARGE_INTEGER liSecond, liStart, liNow;
	QueryPerformanceFrequency(&liSecond);

	timeBeginPeriod(1); // set scheduler granularity to 1 ms

	wc.hInstance = hInstance;
	wc.lpfnWndProc = wnd_proc;
	wc.lpszClassName = L"MY_CLASS";
	
	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Can't register class", 0, 0);
		return 0;
	}

	hWnd = CreateWindow(wc.lpszClassName, L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, BMPW*15, BMPH*15, 0, 0, hInstance, 0);
	
	if (!hWnd) {
		MessageBox(0, L"Can't create window", 0, 0);
		return 0;
	}

	MSG msg;
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

		update_buffer();
		draw_buffer(hWnd, hDC);

		ReleaseDC(hWnd, hDC);

		while (1) {
			QueryPerformanceCounter(&liNow);
			Sleep(1);
			if (liNow.QuadPart > liStart.QuadPart + liSecond.QuadPart / gFrameRate) {
				break;
			}
		}
	}
	return 0;
}