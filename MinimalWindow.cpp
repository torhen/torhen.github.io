#include <windows.h>

int _stdcall WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
	HWND hWnd;
	WNDCLASS wc;
	MSG msg;

	wc = {};
	wc.lpfnWndProc = DefWindowProc;
	wc.hInstance = hInstance;
	wc.lpszClassName = L"TEST_CLASS";

	RegisterClass(&wc);

	hWnd = CreateWindow(L"TEST_CLASS", L"MinimalWindow", WS_OVERLAPPEDWINDOW|WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT, 800, 600, 0, 0, hInstance, 0);

	while (true) {
		GetMessage(&msg, 0, 0, 0);
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	
}