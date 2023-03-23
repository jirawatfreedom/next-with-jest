import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import {jest, test} from '@jest/globals';
import { HeroT } from "@/types/Hero";
import { getHeroDetail } from '../../src/pages/api/getHeroDetail';

const SUPERMAN:HeroT = {
  id: 1,
  name: 'Superman',
  avatar: 'https://cdn.theatlantic.com/thumbor/xuePShEYRyEQec_THgWcYFhYLnw=/540x0:2340x1800/500x500/media/img/mt/2016/01/superman/original.jpg',
  description: 'Superman is a fictional superhero. The character was created by writer Jerry Siegel and artist Joe Shuster, and first appeared in the comic book Action Comics #1 (cover-dated June 1938 and published April 18, 1938).[1] The character regularly appears in comic books published by DC Comics, and has been adapted to a number of radio serials, movies, and television shows.',
}
const BATMAN:HeroT = {
  id: 2,
  name: 'Batman',
  avatar: 'https://www.1999.co.jp/itbig47/10475358.jpg',
  description: 'Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger,[2][3] and first appeared in Detective Comics #27 in 1939. Originally named the "Bat-Man," the character is also referred to by such epithets as the Caped Crusader, the Dark Knight, and the World\'s Greatest Detective.'
}

describe("Home Page",  () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("should display label & input & submit button", () => {
    render(<Home />);
    screen.getByLabelText("Search");
    screen.getByRole("button", { name: "Submit" });
  });

  it("should click submit button", async () => {
    render(<Home />)
    userEvent.type(screen.getByLabelText("Search"), 'superman')
    userEvent.click(screen.getByRole("button", { name: "Submit" }))
  })
  

  test('should run getHeroDetail API with superman and batman', async () => {
    const actualSuperman = await getHeroDetail('superman')
    expect(actualSuperman.id).toBe(SUPERMAN.id)
    expect(actualSuperman.name).toBe(SUPERMAN.name)
    expect(actualSuperman.avatar).toBe(SUPERMAN.avatar)
    expect(actualSuperman.description).toBe(SUPERMAN.description)

    const actualBatman = await getHeroDetail('batman')
    expect(actualBatman.id).toBe(BATMAN.id)
    expect(actualBatman.name).toBe(BATMAN.name)
    expect(actualBatman.avatar).toBe(BATMAN.avatar)
    expect(actualBatman.description).toBe(BATMAN.description)
  });

  test('should mock superman', async () => {

    const sut  = jest.fn<() => Promise<HeroT>>().mockResolvedValue(SUPERMAN)
    const actual = await sut()
    expect(actual).toBe(SUPERMAN)
  });
  
  test('async once', async () => {
    const asyncMock = jest
      .fn<() => Promise<string>>()
      .mockResolvedValue('default')
      .mockResolvedValueOnce('first call')
      .mockResolvedValueOnce('second call')
      .mockResolvedValueOnce('third call');
  
    const first = await asyncMock(); // 'first call'
    const second = await asyncMock(); // 'second call'
    const third = await asyncMock(); // 'second call'
    await asyncMock(); // 'default'
    await asyncMock(); // 'default'
    expect(first).toBe('first call')
    expect(second).toBe('second call')
    expect(third).toBe('third call')
  });


});


