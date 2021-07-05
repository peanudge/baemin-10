
# Mac Terminal 을 좀더 화려하게 꾸미기.

맥을 사용하다보면 알겠지만 기본 terminal은 조금 지루합니다. 
그래서 맥을 이용해서 소프트웨어 개발을 하는 사람들은 터미널을 좀더 직관적인 색상과 디자인을 이용해 꾸미곤합니다.

저도 매번 세팅할 때마다 찾아보곤합니다.

이번 기회를 토대로 iTerm2 과 Oh My Zsh를 이용해서 세팅하는 방법을 정리해보겠습니다.

## iTerm 2 설치

간단히 아래 링크에서 간단히 설치!

> https://iterm2.com/

## Mac 에서 패키지 관리를 해주는 HomeBrew 설치

> https://brew.sh/index_ko

위 설치 링크에 있는  아래 명령을 실행해서 설치

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## ZSH 과 Oh My ZSH 설치!
zsh는 터미널 shell 환경을 위한 도구로, (가볍고 빠르기는 하지만 어딘가 조금은 예쁘지 않고 별다른 기능이 없는) bash 쉘의 기능을 포함하여 편리한 기능이 여러가지 추가되어 있는 Shell 환경입니다.

oh-my-zsh는 zsh 설정 관리를 위한 프레임워크로 rails, git, OSX, homebrew, php, python 등을 위한 수많은 플러그인과 테마를 지원하고 있어서 zsh를 편리하게 사용할 수 있도록 도와줍니다.

- ZSH 설치

위에서 먼저 설치해준 HomeBrew를 활용해서 ZSH를 설치해줍니다.

```
brew update
brew install zsh
```


- Oh My ZSH! 설치
  
```
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```

# 마지막으로 ZSH 테마 설정 및 설치입니다.

- 1. dracula zsh 저장소를 클론해서 받아줍니다.

```
git clone https://github.com/dracula/zsh.git
```

- 2. 클론된 zsh 프로젝트 속 `dracula.zsh-theme` 파일을 `~/.oh-my-zsh/theme` 속으로 옮겨주기.

```
cp zsh/dracula.zsh-theme .oh-my-zsh/
```

- 3. 테마 적용하는 설정 추가해주기.

```
$ vi ~/.zshrc 
```

vim editor로 `.zshrc`에 theme 설정을 추가해줍니다.

```
ZSH_THEME="dracula"
```

