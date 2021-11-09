#include <windows.h>
#include <vector>
#pragma comment(lib, "winmm.lib")

using namespace std;

const int BMPW = 160;
const int BMPH = 90;

UINT32 gPixel[BMPW * BMPH];
int gFrameRate = 60;
long int gFrameCount;

const UINT32 RED = 0x00FF0000;
const UINT32 GREEN = 0x0000FF00;
const UINT32 BLUE = 0x000000FF;
const UINT32 WHITE = 0x00FFFFFF;
const UINT32 LIGHT_GRAY = 0xFFAAAAAA;
const UINT32 DARK_GRAY = 0xFF444444;
const UINT32 YELLOW = 0xFFFFFF00;

int gGunPosition;
int gGameFinished = 0;

void draw_background(UINT32 color = 0) {
	for (int i = 0; i < BMPW * BMPH; i++) {
		gPixel[i] = color;
	}
}

void draw_pixel(int x, int y, UINT32 color) {
	if (x >= BMPW || y >= BMPH || y < 0 || x < 0) {
		return;
	}
	gPixel[int(x) + int(y * BMPW)] = color;
}

void draw_rect(RECT r) {
	for (int y = r.top; y < r.bottom; y++) {
		for (int x = r.left; x < r.right; x++) {
			draw_pixel(x, y, BLUE);
		}
	}
}

class CSprite {
public:
	double m_posx = 0;
	double m_posy = 0;
	double m_dx = 0;
	double m_dy = 0;
	int m_width = 11;
	int m_height = 8;
	UINT32 m_color = 0xFFFFFFFF;
	const char* m_str = "\
  #     #  \
   #   #   \
  #######  \
 ## ### ## \
###########\
# ####### #\
# #     # #\
   ## ##   \
";
	CSprite() {
	}

	CSprite(double posx, double posy, double dx, double dy, UINT32 color) {
		m_posx = posx;
		m_posy = posy;
		m_dx = dx;
		m_dy = dy;
		m_color = color;
	}

	void update() {
		m_posx += m_dx;
		m_posy += m_dy;
	}

	void draw() {
		int n = 0;
		for (int y = 0; y < m_height; y++) {
			for (int x = 0; x < m_width; x++) {
				if (m_str[n] == '#') {
					draw_pixel((LONG)m_posx + x, (LONG)m_posy + y, m_color);
				}
				n++;
			}
		}
	}


	RECT get_rect() {
		RECT r;
		r.left = (LONG)m_posx;
		r.right = (LONG)m_posx + m_width;
		r.top = (LONG)m_posy;
		r.bottom = (LONG)m_posy + m_height;
		return r;
	}
};

class CSpriteVector {
public:
	vector <CSprite> m_vector;
	double m_velocity = 0.5;
	int m_cols = 7;
	int m_rows = 3;
	int x_spacing = 15;
	int y_spacing = 10;
	int m_upper_space = 3;
	int m_rows_done = 0;
	double m_sink_speed = 3;

	CSpriteVector() {
		init();
	}

	void init() {
		m_vector.clear();
		for (int y = 0; y < m_rows; y++) {
			for (int x = 0; x < m_cols; x++) {
				CSprite tmp = CSprite(
					double(x) * x_spacing,
					double(y) * y_spacing + m_upper_space,
					m_velocity, 0.0, WHITE);
				m_vector.push_back(tmp);
			}
		}
	}


	int size() {
		return m_vector.size();
	}

	void del(int n) {
		m_vector.erase(m_vector.begin() + n);
	}

	int get_max_x() {
		int res = 0;
		int size = m_vector.size();
		for (int n = 0; n < size; n++) {
			RECT r = m_vector[n].get_rect();
			if (r.right > res) {
				res = r.right;
			}
		}
		return res;
	}

	int get_min_x() {
		int res = BMPW;
		int size = m_vector.size();
		for (int n = 0; n < size; n++) {
			RECT r = m_vector[n].get_rect();
			if (r.left < res) {
				res = r.left;
			}
		}
		return res;
	}

	int get_max_y() {
		int res = 0;
		int size = m_vector.size();
		for (int n = 0; n < size; n++) {
			RECT r = m_vector[n].get_rect();
			if (r.bottom > res) {
				res = r.bottom;
			}
		}
		return res;
	}

	void update() {
		int sprl = m_vector.size();
		// all go left if rightmost touches right border
		if (get_max_x() >= BMPW) {
			double new_dx = -m_vector[sprl - 1].m_dx;
			for (int i = 0; i < sprl; i++) {
				m_vector[i].m_dx = new_dx;
			}
			m_rows_done++;
			for (int i = 0; i < sprl; i++) {
				m_vector[i].m_posy += m_sink_speed;
			}
		}

		// all go right if leftmost touches left border
		if (get_min_x() < 0) {
			double new_dx = -m_vector[0].m_dx;
			for (int i = 0; i < sprl; i++) {
				m_vector[i].m_dx = new_dx;
			}
			m_rows_done++;
			for (int i = 0; i < sprl; i++) {
				m_vector[i].m_posy += m_sink_speed;
			}
		}

		// update all sprites
		for (int i = 0; i < sprl; i++) {
			m_vector[i].update();
		}

		// check if touched the ground
		if (get_max_y() > BMPH) {
			for (int i = 0; i < sprl; i++) {
				init();
			}
		}
	}

	void draw() {
		int sprl = m_vector.size();
		for (int i = 0; i < sprl; i++) {
			m_vector[i].draw();
		}
	}

	CSprite get_sprite(int n) {
		return m_vector[n];
	}
};



class CShooter {
public:
	int m_width = 15;
	int m_height = 6;
	double m_posx = BMPW / 2 - m_width / 2;
	double m_posy = BMPH - m_height - 3;
	UINT32 m_color = 0xFFFF0000;
	const char* m_str = "\
       #       \
      ###      \
 ############# \
###############\
###############\
###############\
";

	void update() {
		int posx = int(m_posx);
		if (GetAsyncKeyState(VK_RIGHT)) {
			posx = int(m_posx) + 1;
		}
		if (GetAsyncKeyState(VK_LEFT)) {
			posx = int(m_posx) - 1;
		}

		if (posx >= 0 && (posx + m_width) <= BMPW) {
			m_posx = posx;
		}

		// needed to create bullets
		gGunPosition = posx + m_width / 2;

	}

	void draw() {
		int n = 0;
		for (int y = 0; y < m_height; y++) {
			for (int x = 0; x < m_width; x++) {
				if (m_str[n] == '#') {
					draw_pixel(int(m_posx) + int(x), int(m_posy) + int(y), m_color);
				}
				n++;
			}
		}
	}
};


class CBullet {
public:
	double m_posx = 20;
	double m_posy = BMPH - 10;
	int m_width = 1;
	int m_height = 2;
	double m_velocity = 2;

	CBullet(int posx) {
		m_posx = posx;
	}

	RECT get_rect() {
		RECT r;
		r.left = (LONG)m_posx;
		r.right = (LONG)m_posx + m_width;
		r.top = (LONG)m_posy;
		r.bottom = (LONG)m_posy + m_height;
		return r;
	}


	void update() {
		m_posy -= m_velocity;
	}

	void draw() {
		for (int y = 0; y < m_height; y++) {
			for (int x = 0; x < m_width; x++) {
				draw_pixel(int(m_posx) + x, int(m_posy) + y, YELLOW);
			}
		}
	}
};


class CBulletVector {
public:
	vector <CBullet> m_vector;
	int m_just_shooted = 0;
	int m_shoot_delay = 20;

	int size() {
		return m_vector.size();
	}

	CBullet get_bullet(int n) {
		return m_vector[n];
	}

	void del(int n) {
		m_vector.erase(m_vector.begin() + n);
	}

	void update() {

		m_just_shooted--;
		if (m_just_shooted < 0) {
			m_just_shooted = 0;
		}

		int shoot_pressed = 0;
		if (GetAsyncKeyState(VK_UP) || GetAsyncKeyState(VK_SPACE)) {
			shoot_pressed = 1;
		}

		if (shoot_pressed && m_just_shooted == 0) {
			CBullet bullet = CBullet(gGunPosition);
			m_vector.push_back(bullet);
			m_just_shooted = m_shoot_delay;
		}

		// erase on bullet outside
		int vs = m_vector.size();
		for (int i = 0; i < vs; i++) {
			m_vector[i].update();
			if (m_vector[i].m_posy <= 0) {
				m_vector.erase(m_vector.begin() + i);
				break;
			}
		}
	}

	void draw() {
		int size = m_vector.size();
		for (int i = 0; i < size; i++) {
			m_vector[i].draw();
		}
	}
};

CSpriteVector sprite_vector;
CShooter shooter;
CBulletVector bullet_vector;

void init() {
}


void update() {
	if (gGameFinished) {
		return;
	}

	draw_background();

	bullet_vector.update();
	bullet_vector.draw();

	sprite_vector.update();
	shooter.update();

	sprite_vector.draw();
	shooter.draw();

	for (int b = 0; b < bullet_vector.size(); b++) {
		for (int s = 0; s < sprite_vector.size(); s++) {
			CBullet bullet = bullet_vector.get_bullet(b);
			RECT r1 = bullet.get_rect();
			RECT r2 = sprite_vector.get_sprite(s).get_rect();

			int x = r1.left;
			int y = r1.bottom;

			if (x > r2.left && x < r2.right && y > r2.top && y < r2.bottom) {
				sprite_vector.del(s);
				bullet_vector.del(b);
				return;
			}
		}
	}


}


LRESULT CALLBACK wnd_proc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam) {

	switch (Msg) {;
		return 0;
	case WM_CLOSE:
		PostQuitMessage(0);
		return 0;
	}
	return DefWindowProc(hWnd, Msg, wParam, lParam);
}

void paint_buffer(HWND hWnd) {
	HDC hDC;
	BITMAPINFO bmi = {};
	RECT cr;
	GetClientRect(hWnd, &cr);
	hDC = GetDC(hWnd);
	bmi.bmiHeader.biSize = sizeof(bmi.bmiHeader);
	bmi.bmiHeader.biWidth = BMPW;
	bmi.bmiHeader.biHeight = -BMPH;
	bmi.bmiHeader.biBitCount = 32;
	bmi.bmiHeader.biPlanes = 1;

	StretchDIBits(hDC, 0, 0, cr.right, cr.bottom,
		0, 0, BMPW, BMPH, gPixel, &bmi, 0, SRCCOPY);

	ReleaseDC(hWnd, hDC);
}

int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR, _In_ int) {
	WNDCLASS wc = {};
	HWND hWnd;

	timeBeginPeriod(1);

	wc.hInstance = hInstance;
	wc.lpfnWndProc = wnd_proc;
	wc.lpszClassName = L"MY_CLASS";

	if (!RegisterClass(&wc)) {
		MessageBox(0, L"Error RegisterClass", 0, 0);
	}

	hWnd = CreateWindow(wc.lpszClassName, L"My Window", WS_OVERLAPPEDWINDOW | WS_VISIBLE,
		CW_USEDEFAULT, CW_USEDEFAULT, BMPW * 2, BMPH * 2, 0, 0, hInstance, 0);
	if (!hWnd) {
		MessageBox(0, L"Error CreateWindow", 0, 0);
	}
	MSG msg;
	LARGE_INTEGER liSecond, liStart, liNow;
	QueryPerformanceFrequency(&liSecond);

	init();
	while (1) {
		QueryPerformanceCounter(&liStart);
		while (PeekMessage(&msg, 0, 0, 0, PM_REMOVE)) {
			if (msg.message == WM_QUIT) {
				return 0;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}

		// update buffer
		gFrameCount++;
		update();
		paint_buffer(hWnd);

		while (1) {
			QueryPerformanceCounter(&liNow);
			if (liNow.QuadPart >= liStart.QuadPart + liSecond.QuadPart / gFrameRate) {
				Sleep(1);
				break;
			}
		}
	}
	return 0;
}