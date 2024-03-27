import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    MessageContext, handleSuccessMessage, handleErrorMessage
} from '../store/MessageStore';

function ProductModal({ closeProductModal, getProducts, type, tempProduct }) {




    const [tempData, setTempData] = useState({
        title: '',
        category: '',
        origin_price: 50,
        price: 300,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
    });

    const [, dispatch] = useContext(MessageContext);

    useEffect(() => {
        if (type === 'create') { //判斷，如果是'create‘直接把資料進行初始化
            setTempData({
                title: '',
                category: '',
                origin_price: 50,
                price: 300,
                unit: '',
                description: '',
                content: '',
                is_enabled: 1,
                imageUrl: '',
                imagesUrl: [
                    '',
                    '',
                    '',
                    '',
                    '',
                ],

            });
        } else if (type === 'edit') { //判斷，如果是'edit'就帶入外部資料
            setTempData(tempProduct); //setTempData預設寫入的方法是帶入tempProduct的值
        };

    }, [type, tempProduct]);
    const handleChange = (e) => {
        const { value, name /*value值，name屬性 */ } = e.target;
        if (['price', 'origin_price'].includes(name)) { //判斷式，需要預先處理的部分，如果name屬性裡面包含price,origin_price
            setTempData({
                ...tempData, //展開取出原始的值
                [name]: Number(value), //將value屬性轉為數字型態
            })
        } else if (name === 'is_enabled') { //判斷如果是否啟用有checked
            setTempData({
                ...tempData, //展開取出原始的值
                [name]: +e.target.checked, //將布林值屬性改成數字前方加上+
            })
        }
        else { //不需要預先處理就直接寫入
            setTempData({
                ...tempData, //展開取出原始的值
                [name]: value, //將name屬性就是欄位名稱
            })

        }
    }

    const submit = async () => {

        try { //按下submit的時候會判對，預設會用新增的形式
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`; //預設api路徑
            let method = 'post'; //預設方法
            if (type === 'edit') { //如果type === 'edit' 
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`; //api改成此路徑
                method = 'put'; //方法改成put
            }
            const res = await axios[method](api, {
                data: tempData
            });
            console.log(res)
            handleSuccessMessage(dispatch, res);
            getProducts(); //提交更新資料同時，可以獲取資料並且關閉Modal
            closeProductModal();
        } catch (error) {
            handleErrorMessage(dispatch, error);
        }
    }



    return (<>
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{type === 'create' ? '建立新商品' : `編輯${tempData.title}`}</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeProductModal /*移除bs原有close功能，加上帶入props關閉功能 */}></button>
                    </div>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='image'>
                                        輸入圖片網址
                                        <input
                                            type='text'
                                            name='imageUrl'
                                            id='image'
                                            placeholder='請輸入圖片連結'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.imageUrl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='customFile'>
                                        或 上傳圖片
                                        <input
                                            type='file'
                                            id='customFile'
                                            name='imagesUrl'
                                            className='form-control'
                                            onChange={handleChange}

                                        />
                                    </label>
                                </div>
                                <img src="" alt='' className='img-fluid' />
                            </div>
                            <div className='col-sm-8'>
                                {/* <pre>
                                    {JSON.stringify(tempData)}
                                </pre> */}
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>
                                        標題
                                        <input
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='請輸入標題'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.title}
                                        />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='category'>
                                            分類
                                            <input
                                                type='text'
                                                id='category'
                                                name='category'
                                                placeholder='請輸入分類'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.category}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='unit'>
                                            單位
                                            <input
                                                type='unit'
                                                id='unit'
                                                name='unit'
                                                placeholder='請輸入單位'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.unit}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='origin_price'>
                                            原價
                                            <input
                                                type='number'
                                                id='origin_price'
                                                name='origin_price'
                                                placeholder='請輸入原價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.origin_price}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='price'>
                                            售價
                                            <input
                                                type='number'
                                                id='price'
                                                name='price'
                                                placeholder='請輸入售價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.price}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>
                                        產品描述
                                        <textarea
                                            type='text'
                                            id='description'
                                            name='description'
                                            placeholder='請輸入產品描述'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.description}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>
                                        說明內容
                                        <textarea
                                            type='text'
                                            id='content'
                                            name='content'
                                            placeholder='請輸入產品說明內容'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.content}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label
                                            className='w-100 form-check-label'
                                            htmlFor='is_enabled'
                                        >
                                            是否啟用
                                            <input
                                                type='checkbox'
                                                id='is_enabled'
                                                name='is_enabled'
                                                placeholder='請輸入產品說明內容'
                                                className='form-check-input'
                                                onChange={handleChange}
                                                checked={Boolean(tempData.is_enabled)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeProductModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={submit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>);

}

export default ProductModal;




