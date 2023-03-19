import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Nav from '../Nav/Nav';
import { Popover, Avatar, Badge } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import {
  SHeader,
  SLayout,
  SLogo,
  SNav,
  SLogin,
  SPrivateContent,
  SNotification,
  SMyInfo,
  SLogout,
} from '../../Style/HeaderStyle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, loggedUserInfo } from '../../atoms/atoms';

function Header() {
  const [isLogged, setIsLogged] = useRecoilState(loginState); // 로그인 여부
  const userInfo = useRecoilValue(loggedUserInfo);

  const [isNoticed, setIsNoticed] = useState(false); // 답변 알림 유무

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [isOpenNav, setIsOpenNav] = useState(false);

  console.log(setIsNoticed); // 답변 알림 미사용으로 인한 ESLint 오류 발생 방지 콘솔

  const handleClickNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  const handleClickLogout = (e) => {
    e.preventDefault();
    setIsLogged(!isLogged);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('recoil-persist');
    localStorage.removeItem('loggedUserInfo');
    cookies.remove('refreshToken');
    navigate('/home');
  };

  return (
    <>
      <SHeader>
        <SLayout>
          <div className="layout-div">
            <SLogo>
              <Link to="/">
                <img src="images/logo.png" alt="logo" />
                <span>다나아</span>
              </Link>
            </SLogo>
            <SNav onClick={handleClickNav}>커뮤니티</SNav>
          </div>
          <div>
            {!isLogged ? (
              <div>
                <SLogin>
                  <button>
                    <Link to="/login">Log in</Link>
                  </button>
                </SLogin>
              </div>
            ) : (
              <SPrivateContent>
                <SMyInfo>
                  <SNotification>
                    {!isNoticed ? null : <Badge dot />}
                    <BellOutlined />
                  </SNotification>
                  <Popover
                    title={`${userInfo?.name} 님, 안녕하세요`}
                    content={<Link to="/myinfo">마이 페이지</Link>}
                  >
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Popover>
                </SMyInfo>
                <SLogout>
                  <button onClick={handleClickLogout}>Log out</button>
                </SLogout>
              </SPrivateContent>
            )}
          </div>
        </SLayout>
      </SHeader>
      {isOpenNav ? <Nav /> : null}
    </>
  );
}

export default Header;
