#include<windows.h>


class CDoc {
public:
	HBITMAP hBitmap;
	LPWSTR pCmdLine;
};
CDoc doc;

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	PAINTSTRUCT ps;
	HDC hDC, hdcMem;
	BITMAP bm;
	RECT client_rect;

	switch (Msg) {

	case WM_CREATE:
		doc.hBitmap = (HBITMAP)LoadImage(0, L"test.bmp", IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE);
		if (doc.hBitmap == 0) {
			MessageBox(0, L"Could not load BMP", 0, 0);
		}
		return 0;

	case WM_PAINT:
		hDC = BeginPaint(hWnd, &ps);

		hdcMem = CreateCompatibleDC(hDC);

		SelectObject(hdcMem, doc.hBitmap);

		// get info about bitmap
		GetObject(doc.hBitmap, sizeof(BITMAP), (LPSTR)&bm);

		GetClientRect(hWnd, &client_rect);
		StretchBlt(hDC, 0, 0, client_rect.right, client_rect.bottom, hdcMem, 0, 0, bm.bmWidth, bm.bmHeight, SRCCOPY);

		// don't forget!
		DeleteDC(hdcMem);

		EndPaint(hWnd, &ps);
		return 0;

	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}


int WINAPI wWinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPWSTR lpCmdLine, _In_ int) {
	doc.pCmdLine = lpCmdLine;
	WNDCLASS wc = {};
	wc.hInstance = hInstance;
	wc.lpszClassName = L"MY_CLASS";
	wc.lpfnWndProc = WndProc;
	wc.hbrBackground = (HBRUSH)GetStockObject(LTGRAY_BRUSH);
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
