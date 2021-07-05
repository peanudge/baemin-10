# 맥 터미널 세팅

## 쉘

Windows에서 Git을 쉘로 사용해야 할 필요가 있을때 `Git Bash`나 `Windows PowerShell`을 사용했다.

`Git Bash`는 이름에서도 보이듯이 Window에서 `Bash`를 사용하기 위한 터미널이다. 이 `Bash`는 UNIX 기반 운영체제인 맥에서는 기본적으로 사용할 수 있어서 따로 설치해줄 필요는 없다.

하지만, 좀 더 편리한 기능을 원하는 개발자들은 `zsh`를 사용하기도 하는데, 

<img width="600" alt="시대의 순정남" src="https://user-images.githubusercontent.com/35324795/124459156-d152e300-ddc8-11eb-8753-eaa8038abf88.png">

(순정을 좋아하는 개발자는 `bash`를 사용한다.)

* 마우스가 지원된다는 점,
* 더 강력한 플러그인과 테마를 적용할 수 있다는 점 등

여러가지 이유로 `zsh`를 사용한다.

** 최근 맥 OS 버전에서는 `zsh`를 기본 쉘로 사용할 수 있다.

## 설치

`zsh`를 사용하기 위해서 `Oh My Zsh`라는 zsh 설정 관리 도구를 주로 사용한다. 그걸 설치해보자.

**[설치 링크](https://ohmyz.sh/#install)**

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

설치하면 된다. 이제 쉘은 설치되었다.

## 터미널

이 쉘이 돌아가도록 해주는게 터미널이라는 프로그램인데, 맥에서는 `Terminal.app`으로 바로 사용할 수 있다. 하지만 이것도 좀 더 편리한 커스터마이징을 위해 사용하는게 있는데, `iTerm2`이다.

**[iTerm2 설치링크](https://iterm2.com/)**

따로 터미널에서 설치할 필요없이 웹사이트에 들어가서 다운로드 받으면 된다. 설치가 끝나면 `cmd` + `space`를 눌러서 `iT` + `enter`만 입력해줘도 `iTerm2`로 자동완성 되어 실행된다.

내가 하는 몇가지 설정을 소개하자면,

* `Preference` > `Appearance` > `Theme` > `Minimal`
* `Preference` > `Profiles` > `Session` > `Status bar enabled` > `Configure Status Bar` > 알아서 설정

이렇게만 해줘도

<img width="500" alt="순정 터미널" src="https://user-images.githubusercontent.com/35324795/124460910-f2b4ce80-ddca-11eb-8e1b-4bd02df0bea7.png">

이랬던 터미널이

<img width="500" alt="바뀐 터미널" src="https://user-images.githubusercontent.com/35324795/124460959-02ccae00-ddcb-11eb-85b4-38fe9430926f.png">

이렇게 변한다.
