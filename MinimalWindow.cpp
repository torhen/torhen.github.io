#include <windows.h>

LRESULT CALLBACK MessageHandler(HWND hWnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
	switch (uMsg) {
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, uMsg, wParam, lParam);
}

int _stdcall WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
	HWND hWnd;
	WNDCLASS wc;
	MSG msg;

	wc = {};
	wc.lpfnWndProc = MessageHandler;
	wc.hInstance = hInstance;
	wc.lpszClassName = L"WINAPITest";

	RegisterClass(&wc);

	hWnd = CreateWindow(L"WINAPITest", L"WinAPI Tutorial", WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 800, 600, 0, 0, hInstance, 0);

	ShowWindow(hWnd, nCmdShow);
	UpdateWindow(hWnd);

	while (true) {
		BOOL result = GetMessage(&msg, 0, 0, 0);
		if (result > 0) {
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}
		else {
			return 0;
		}
		
	}
}