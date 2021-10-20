#include <windows.h>

LRESULT CALLBACK WndProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {
	switch (Msg) {
	case WM_PAINT:
	{
		PAINTSTRUCT ps;
		HDC hDC;
		hDC = BeginPaint(hWnd, &ps);
		DrawText(hDC, L"TEST", -1, &ps.rcPaint, 0);
		EndPaint(hWnd, &ps);
	}return 0;

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

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Can't register Window Class", 0, 0);
		return 0;
	}

	CreateWindow(wc.lpszClassName, L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE, 0, 0, 500, 500, 0, 0, hInstance, 0);

	MSG msg;
	while (GetMessage(&msg, 0, 0, 0)) {
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	return 0;
}