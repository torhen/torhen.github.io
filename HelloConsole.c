#include <windows.h>
#include <time.h>

int main(){
	char str[80];
	COORD coord;

	HANDLE hConsole = CreateConsoleScreenBuffer(GENERIC_READ|GENERIC_WRITE, FILE_SHARE_READ|FILE_SHARE_WRITE,NULL,CONSOLE_TEXTMODE_BUFFER,NULL);                   // reserved; must be NULL   
	SetConsoleActiveScreenBuffer(hConsole);
	DWORD dBytesWritten = 0;
	   
	 while(1){
		time_t t = time(NULL);
		struct tm tm = *localtime(&t);
		sprintf(str, "Hello Console! %d-%02d-%02d %02d:%02d:%02d\0", tm.tm_year + 1900, tm.tm_mon + 1, tm.tm_mday, tm.tm_hour, tm.tm_min, tm.tm_sec);

	    coord.X = 10;
		coord.Y = 10;
	    WriteConsoleOutputCharacter(hConsole,str,lstrlen(str),coord,&dBytesWritten);
	 }
}