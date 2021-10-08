#include <windows.h>

int _stdcall WinMain(HINSTANCE hInstance, HINSTANCE, char* , int){

	MessageBox(0, L"Hello World!", L"Greeting", 0);
	return 0;
}