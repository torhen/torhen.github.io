#include <windows.h>
// Application can't be properly closed

int _stdcall WinMain(HINSTANCE hInstance, HINSTANCE, LPSTR, int) {
	HWND hWnd;
	WNDCLASS wc;
	MSG msg;

	wc = {};
	wc.lpfnWndProc = DefWindowProc;
	wc.hInstance = hInstance;
	wc.lpszClassName = L"MY_CLASS";

	RegisterClass(&wc);

	hWnd = CreateWindow(L"MY_CLASS", L"MinimalWindow", WS_OVERLAPPEDWINDOW|WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 800, 600, 0, 0, hInstance, 0);

	while (true) {
		GetMessage(&msg, 0, 0, 0);
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	
}