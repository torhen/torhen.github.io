#include <windows.h>
#include <wchar.h>

const int BMP_W = 500;
const int BMP_H = 500;
BITMAPINFO g_Bmi;
UINT32 g_Pixel[BMP_W * BMP_H];


float g_x = -0.595231;
float g_y = 0.621067;
float g_d = 5;
float g_factor = 0.95;

int apfel(float px, float py) {
	float x = 0.0;
	float y = 0.0;
	float a;
	int i = 0;
	float xn, yn;

	for (i = 0; i < 100; i++) {
		xn = x * x - y * y + px;
		yn = 2.0 * x * y + py;
		x = xn;
		y = yn;
		a = x * x + y * y;
		if (a > 100000) {
			break;
		}
	}

	return i;
}

int set_pixel(int x, int y, int r, int g, int b) {
	g_Pixel[y * BMP_W + x] = RGB(b, g, r);
	return 0;
}

int update(float x0, float x1, float y0, float y1) {

	int iX, iY, res;
	float x, y;


	float dx = (x1 - x0) / BMP_W;
	float dy = (y1 - y0) / BMP_H;

	for (iY = 0; iY < BMP_H; iY++) {
		for (iX = 0; iX < BMP_W; iX++) {
			x = x0 + iX * dx;
			y = y0 + iY * dy;
			res = apfel(x, y);
			int r = res % 10; res = int(res / 10);
			int g = res % 10; res = int(res / 10);
			int b = res % 10; res = int(res / 10);

			set_pixel(iX, iY, r*100, g*100, b*100);
		}
	}
	return 0;
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam)  {
	int mx, my;
	float dx, dy;
	float x0, x1, y0, y1;

	switch (Msg) {
	case WM_LBUTTONDOWN:
		mx = LOWORD(lParam);
		my = HIWORD(lParam);
		//MessageBox(0, L"TEST", 0, 0);

		x0 = g_x - g_d;
		x1 = g_x + g_d;
		y0 = g_y - g_d;
		y1 = g_y + g_d;

		dx = (x1 - x0) / BMP_W;
		dy = (y1 - y0) / BMP_H;

		g_x = x0 + mx * dx;
		my = BMP_H - my;
		g_y = y0 + my * dy;

		return 0;
	case WM_CREATE:
		g_Bmi = {};
		g_Bmi.bmiHeader.biSize = sizeof(g_Bmi.bmiHeader);
		g_Bmi.bmiHeader.biPlanes = 1;
		g_Bmi.bmiHeader.biBitCount = 32;
		g_Bmi.bmiHeader.biWidth = BMP_W;
		g_Bmi.bmiHeader.biHeight = BMP_H;

		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}



int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {
	HWND hWnd;
	RECT cr;
	WNDCLASS wc = {};

	wc.hInstance = hInstance;
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Can't regiszter class.", 0, 0);
	}

	hWnd = CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, BMP_W, BMP_H, 0, 0, hInstance, 0);

	MSG msg;
	RECT rc;
	HDC hDC;
	while (1) {
		while (PeekMessage(&msg, 0, 0, 0, PM_REMOVE)) {
			if (msg.message == WM_QUIT) {
				return 0;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}


		GetClientRect(hWnd, &cr);
		hDC = GetDC(hWnd);


		g_d = g_d * g_factor;

		if (g_d < 0.000001) {
			g_factor = 1.05;
		}

		if (g_d > 5) {
			g_factor = 0.98;
		}




		wchar_t buffer[100];
		swprintf(buffer, 100,  L"%f %f\n", g_x, g_y);
		OutputDebugString(buffer);


		update(g_x - g_d, g_x + g_d, g_y - g_d, g_y + g_d);


		StretchDIBits(hDC, 0, 0, cr.right, cr.bottom, 0, 0, BMP_W, BMP_H, g_Pixel, &g_Bmi, 0, SRCCOPY);
		ReleaseDC(hWnd, hDC);
	}
	return 0;
}