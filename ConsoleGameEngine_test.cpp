#include <iostream>
using namespace std;

#include "olcConsoleGameEngine.h"
//https://github.com/OneLoneCoder/videos/blob/master/olcConsoleGameEngine.h

class Example : public olcConsoleGameEngine
{

public:
	Example()
	{}


	virtual bool OnUserCreate()
	{
		return true;
	}

	virtual bool OnUserUpdate(float fElapsedTime)
	{
		for (int i = 0; i < 16; i++) {

			Fill(10, 10 * i, 20, 10 * i + 10, PIXEL_SOLID, i);
			Fill(20, 10 * i, 30, 10 * i + 10, PIXEL_HALF, i);
		}
		
		return true;
	}
};

int main() {
	Example demo;
	demo.ConstructConsole(320, 200, 2, 2);
	demo.Start();

}