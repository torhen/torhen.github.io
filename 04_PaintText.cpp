#include<windows.h>

LRESULT _stdcall WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	HDC hdc;
	PAINTSTRUCT ps;
	RECT rect = {10, 10, 100, 100};
	switch (Msg) {
	case WM_PAINT:
		hdc = BeginPaint(hWnd, &ps);
		DrawText(hdc, L"Hello World!", -1, &rect, 0);
		EndPaint(hWnd, &ps);
		return 0;
	case WM_DESTROY:
			PostQuitMessage(0);
			return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ char*, _In_ int iCmdShow) {

	WNDCLASS wc = {};
	wc.lpfnWndProc = WndProc;
	wc.lpszClassName = L"MY_CLASS";
	wc.hInstance = hInstance;

	RegisterClass(&wc);

	HWND hWnd;
	hWnd = CreateWindow(L"MY_CLASS", L"My Window", WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, 0);

	ShowWindow(hWnd, iCmdShow);
	UpdateWindow(hWnd);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}
	return 0;
}