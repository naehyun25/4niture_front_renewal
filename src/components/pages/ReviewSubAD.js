import React, { useState } from "react";
import { API_URL } from "../../config/constants.js";
import { Button, ConfigProvider, Form, Input, Upload, Divider, message } from "antd";
import styles from "./ReviewSubAD.module.css";
import axios from "axios";
import { CameraOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ReviewSub = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = function (val) {
    // console.log(val);
    axios
      .post(`${API_URL}/reviews`, {
        name: val.name,
        productname: val.productname,
        imageUrl: imageUrl,
        desc: val.desc,
      })
      .then((result) => {
        // console.log(result);
        // navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다 ${error.message}`);
      });
  };

  const onChangeImage = function (info) {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      //파일 업로드가 완료 되면 setImageUrl 속성에 imageUrl 을 할당
      setImageUrl(imageUrl);
    }
  };

  const info = () => {
    messageApi.info("글이 등록되었습니다!");
  };

  //리셋버튼
  const onReset = () => {
    form.resetFields();
  };
  //--리셋버튼

  return (
    <div>
      <div id={styles.uploadContainer}>
        <ConfigProvider theme={{ token: { colorPrimary: "#F25A29" } }}>
          <Form name='upload' style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
            <Form.Item name='upload' valuePropName='image'>
              <div id={styles.uploadImg}>
                <Upload name='image' action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
                  {imageUrl ? (
                    <img id={styles.uploadImg} src={`${API_URL}/${imageUrl}`} alt='' />
                  ) : (
                    <div id={styles.imguploadbox}>
                      {/* <img src='../images/icons/camera.png' alt='' /> */}
                      <CameraOutlined style={{ marginBottom: 15, fontSize: 25, display: "flex", justifyContent: "center" }} />
                      <span style={{ display: "block", textAlign: "center" }}>사진을 올려 주세요.</span>
                      <span style={{ display: "block", textAlign: "center" }}>jpg | png</span>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>

            <Divider></Divider>
            <Form.Item label={<span className='upload-label'>작성자</span>} name='name' rules={[{ required: true, message: "이름을 입력해주세요" }]}>
              <Input className={styles.uploadName} placeholder='이름을 입력해주세요' size='large' />
            </Form.Item>
            <Divider></Divider>

            <Form.Item label={<span className='upload-label'>상품명</span>} name='productname' rules={[{ required: true, message: "상품명을 입력해주세요" }]}>
              <Input className={styles.uploadName} placeholder='상품명을 입력해주세요' size='large' />
            </Form.Item>
            <Divider></Divider>

            <Form.Item label={<div className='upload-label'>글쓰기</div>} name='desc' rules={[{ required: true, message: "텍스트를 입력해주세요." }]}>
              <TextArea className={styles.Textarea} size='large' id='product-description' showCount maxLength={300} placeholder='텍스트를 작성해주세요'></TextArea>
            </Form.Item>
            <Form.Item>
              {contextHolder}
              <Button id={styles.submitButton} htmlType='submit' onClick={info}>
                후기등록하기
              </Button>
              <Button id={styles.resetButton} htmlType='button' onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
            <Divider></Divider>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};
export default ReviewSub;
