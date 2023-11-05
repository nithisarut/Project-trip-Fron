import { Badge, Button, Card, Col, Image, Modal, Row, Upload, message } from 'antd'
import React, { useState } from 'react'
import NavAdmin from '../../../components/admin/NavAdmin'
import { Datum } from '../../../app/models/Location';
import { ImageDetailLocation } from '../../user/TabLocation';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import agent from '../../../app/api/agent';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/configureStore';
import useImageDetail from './useImageDetail';



function ModalAddimage({ id } : any) {

  const { state } = useLocation();
  const { AddImage  } = useImageDetail();
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [imageSum, setImageSum] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setImageSum([]);
    setImgUrl([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImageSum([]);
    setImgUrl([]);
  };

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImgUrl((data) => {
        return [...data, url]
      });
    });
    
    setImageSum((data) => {
      return [...data, info.file.originFileObj]
    });

    setLoading(false);
  };

  var bgColors = {
    "BlueThream": "#0B2447",
  };

  const RemoveImageUrl = (data : any) => setImgUrl(imgUrl.filter((e : any) => e !== data));


  const buttonUpload = <Upload
    style={{ width: "20px" }}
    multiple={true}
    showUploadList={false}
    onChange={handleChange}
  >
    <Button className='text-st' loading={loading} icon={<UploadOutlined />}>
      เพิ่มรูปภาพ
    </Button>
  </Upload>

  const onClickImage = async () => {
      let result: any;
      result = await agent.Images.createImages({ LocationId : id , ImageSum : imageSum });
        
        if (result!.msg === "OK")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
              handleCancel();
              AddImage(id);
            });
  }

  return (
    <React.Fragment>
      <Button type="primary" style={{ backgroundColor: bgColors.BlueThream }} onClick={showModal}>
        เพิ่มรูปภาพเพิ่มเติม
      </Button>
      <Modal width={700} footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {buttonUpload}
        <div className="w-full lg:w-12/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 ">
            {imgUrl.length > 0 && imgUrl.map(e => <Badge count={<Button
              type="primary"
              shape="circle"
              htmlType='button'
              danger icon={<CloseOutlined />}
              onClick={() => RemoveImageUrl(e)}
              size="small"
              style={{ marginLeft: "5px" }} />}><img src={e} /></Badge>)}

          </div>
          <Button onClick={onClickImage} style={{marginTop:"10px",display:"flex",justifyContent:"end"}} >บันทึก</Button>

        </div>

      </Modal>




    </React.Fragment>
  )
}

export default ModalAddimage