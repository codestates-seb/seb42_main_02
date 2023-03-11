import { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { FcInfo } from 'react-icons/fc';
import {
  SMain,
  SLayout,
  SInfoSection,
  SFormSection,
  SInput,
  STermSection,
  STerm,
  SFileInput,
  SPolicy,
  SSubmitBtn,
  SLoginInfo,
  SLoginBtn,
  SModalLayout,
  SModal,
  DoctorRegiInfo,
} from '../../Style/DoctorSignupStyle';
import axios from 'axios';

const DoctorSignup = () => {
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imgFile, setImgFile] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const [nameMsg, setNameMsg] = useState(''); // 유효성 검사 안내 Msg for name && hospital
  const [emailMsg, setEmailMsg] = useState(''); // Msg for eamil
  const [passwordMsg, setPasswordMsg] = useState(''); // Msg for PW

  const [isOpenModal, setIsOpenModal] = useState(false);

  // * '/doctors/signup' 이나 json-server '/' 인식 불가능으로 '/doctors' 으로 임시 적용

  const handleSubmit = () => {
    const formData = new FormData(); // 새로운 formData를 찍어내 그안에 키와 밸류의 형태로 넣어주는 형식
    formData.append('email', email);
    formData.append('hospital', hospital);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('img', imgFile);

    // formDate 값 확인하기
    /*
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    */

    axios({
      method: 'post',
      url: 'http://localhost:3001/doctors',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log('Error!');
      });
  };

  const notTobeNull = ({ hospital, email, password }) => {
    return hospital !== null && email !== null && password !== null;
  };

  // 닉네임 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateName = () => {
    return name.match(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
  };

  // 병원명 정규 표현식
  // 한글, 영어만 입력 받기
  const vaildateHospital = () => {
    return name.match(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
  };

  // 이메일 정규 표현식
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  // 비밀번호 정규 표현식
  // 문자, 특수문자, 숫자를 포함 (글자 수 최소 8 ~ 최대 15)
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/);
  };

  // 이름
  const handleChangeName = (e) => {
    const currName = e.target.value;
    setName(currName);

    if (!vaildateName(name)) {
      // 오류 안내창 병원명과 공유
      setNameMsg('한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.');
    } else {
      setNameMsg('');
    }
  };

  // 병원명
  const handleChangeHospital = (e) => {
    const currHospital = e.target.value;
    setHospital(currHospital);

    if (!vaildateHospital(hospital)) {
      setNameMsg('한글과 영문을 제외한 숫자 및 특수문자는 입력이 어렵습니다.');
    } else {
      setNameMsg('');
    }
  };

  // 이메일
  const handleChangeEmail = (e) => {
    const currEmail = e.target.value;

    setEmail(currEmail);
    if (!validateEmail(email)) {
      setEmailMsg(`${currEmail} 은 올바른 이메일 형식이 아닙니다.`);
    } else {
      setEmailMsg('');
    }
  };

  // 비밀번호
  const handleChangePassword = (e) => {
    const currPassword = e.target.value;

    setPassword(currPassword);

    if (!validatePwd(password)) {
      setPasswordMsg(`비밀번호를 확인하여 주십시오.`);
    } else {
      setPasswordMsg('');
    }
  };

  // 유효성 검사 미통과 안내 Msg
  const handleClickAlert = () => {
    messageApi.open({
      type: 'warning',
      content: nameMsg || emailMsg || passwordMsg || '내용을 입력해 주세요',
    });
  };

  // 유효성 검사를 통과하지 못하면 Submit 비활성화
  const isvaildateName = vaildateName(name);
  const isHospitalVaild = vaildateHospital(hospital);
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isNotNull = notTobeNull({ name, hospital, email, password });
  const isAllValid =
    isvaildateName &&
    isHospitalVaild &&
    isEmailValid &&
    isPwdValid &&
    isNotNull;

  // Img File
  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setImgFile(uploadFile);
    }
  };

  const handleClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <SMain>
      <SLayout>
        {isAllValid ? null : contextHolder}
        <SInfoSection>
          <img src="images/logo.png" alt="logo" />
          <h1>의료인 회원가입</h1>
          <p>회원가입으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <div>
            <SInput
              onChange={handleChangeName}
              onClick={handleClickAlert}
              placeholder="이름"
            />
            <SInput
              onChange={handleChangeHospital}
              onClick={handleClickAlert}
              placeholder="병원명"
            />
            <SInput
              onChange={handleChangeEmail}
              onClick={handleClickAlert}
              placeholder="이메일"
            />
            <SInput
              type="password"
              onChange={handleChangePassword}
              onClick={handleClickAlert}
              placeholder="비밀번호"
            />
          </div>
          <SFileInput>
            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple="multiple"
              onChange={onChangeImg}
            />
            <SPolicy>
              <FcInfo />
              <button onClick={handleClickModal}>인증 상세안내</button>
            </SPolicy>
          </SFileInput>
          <STermSection>
            <STerm>
              <input type="checkbox" name="" value="" />
              전체 동의
            </STerm>
            <STerm>
              <div>
                <input type="checkbox" name="" value="" />
                서비스 이용약관
              </div>
              <div>
                <input type="checkbox" name="" value="" />
                위치 기반 서비스
              </div>
            </STerm>
          </STermSection>
          <SSubmitBtn
            type="submit"
            disabled={!isAllValid}
            onClick={handleSubmit}
          >
            회원가입
          </SSubmitBtn>
        </SFormSection>
        <SLoginInfo>
          <div>
            <p>다나아의 회원이신가요?</p>
            <SLoginBtn>
              <Link to="/login">로그인</Link>
            </SLoginBtn>
          </div>
          <div>
            <p>질문 및 리뷰 작성을 위한 </p>
            <SLoginBtn>
              <Link to="/register">회원가입</Link>
            </SLoginBtn>
          </div>
          {isOpenModal ? (
            <SModalLayout>
              <SModal>
                <BsArrowReturnLeft onClick={handleClickModal} />
                <DoctorRegiInfo>안내 이미지 예정</DoctorRegiInfo>
              </SModal>
            </SModalLayout>
          ) : null}
        </SLoginInfo>
      </SLayout>
    </SMain>
  );
};

export default DoctorSignup;
