#include <windows.h>

void Draw(HWND hWnd)
{
    HDC hdc;
    int dx = rand() % 500;
    int dy = rand() % 500;
    RECT   rect = { 10 + dx, 10 + dy, 100 + dx, 100 + dy };

    hdc = GetDC(hWnd);
    DrawText(hdc, L"TEST", -1, &rect, 0);
    ReleaseDC(hWnd, hdc);
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT iMsg, WPARAM wParam, LPARAM lParam)
{
    switch (iMsg) {
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    }
    return DefWindowProc(hwnd, iMsg, wParam, lParam);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int iCmdShow){
    HWND         hwnd;
    MSG          msg;
    WNDCLASS wc = {};

    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = L"MY_CLASS";

    RegisterClass(&wc);

    hwnd = CreateWindow(L"MY_CLASS", L"MY Window", WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 500, 500, 0, 0, hInstance, NULL);

    ShowWindow(hwnd, iCmdShow);
    UpdateWindow(hwnd);

    while (TRUE)
    {
        if (PeekMessage(&msg, NULL, 0, 0, PM_REMOVE))
        {
            if (msg.message == WM_QUIT)
                break;

            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
        else
            Draw(hwnd);
            Sleep(0);
    }
    return 0;
}



