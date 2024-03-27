import { useEffect, useState } from "react";
import axios from "axios";

function CouponModal({ closeModal, getCoupons, type, tempCoupon }) {

    const [tempData, setTempData] = useState({
        title: '',
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: 'testCode'
    });

    const [date, setDate] = useState(new Date()); //預設一個預設值給Date

    useEffect(() => {
        if (type === 'create') { //判斷，如果是'create‘直接把資料進行初始化
            setTempData({
                title: '',
                is_enabled: 1,
                percent: 80,
                due_date: 1555459200,
                code: 'testCode'
            });
            setDate(new Date());
        } else if (type === 'edit') { //判斷，如果是'edit'就帶入外部資料
            setTempData(tempCoupon); //setTempData預設寫入的方法是帶入tempCoupon的值
            setDate(new Date(tempCoupon.due_date));//寫入方式用new Date做呈現，取出tempCoupon.due_date
        };

    }, [type, tempCoupon]);
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
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`; //預設api路徑
            let method = 'post'; //預設方法
            if (type === 'edit') { //如果type === 'edit' 
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`; //api改成此路徑
                method = 'put'; //方法改成put
            }
            const res = await axios[method](api, {
                data: {
                    ...tempData,
                    due_date: date.getTime(),//這段轉換成unix timestamp
                },
            });
            console.log(res)
            getCoupons(); //提交更新資料同時，可以獲取資料並且關閉Modal
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }



    return (<>
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{type === 'create' ? '建立新優惠券' : `編輯${tempData.title}`}</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal /*移除bs原有close功能，加上帶入props關閉功能 */}></button>
                    </div>
                    <div className='modal-body'>
                        <div className='mb-2'>
                            <label className='w-100'
                                htmlFor='title'
                            >
                                標題
                                <input
                                    type='text'
                                    id='title'
                                    placeholder='請輸入標題'
                                    name='title'
                                    className='form-control mt-1'
                                    value={tempData.title}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='percent'
                                >
                                    折扣（%）
                                    <input
                                        type='text'
                                        name='percent'
                                        id='percent'
                                        placeholder='請輸入折扣（%）'
                                        className='form-control mt-1'
                                        value={tempData.percent}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='due_date'
                                >
                                    到期日
                                    <input
                                        type='date'
                                        id='due_date'
                                        name='due_date'
                                        placeholder='請輸入到期日'
                                        className='form-control mt-1'
                                        value={`${date.getFullYear().toString()}-${( //取出年份轉換成字串
                                            date.getMonth() + 1
                                        )
                                            .toString()
                                            .padStart(2, 0)}-${date
                                                .getDate()
                                                .toString()
                                                .padStart(2, 0)}`}
                                        onChange={(e) => {
                                            setDate(new Date(e.target.value));
                                        }}
                                    />
                                </label>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <label className='w-100' htmlFor='code'
                                >
                                    優惠碼
                                    <input
                                        type='text'
                                        id='code'
                                        name='code'
                                        placeholder='請輸入優惠碼'
                                        className='form-control mt-1'
                                        value={tempData.code}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <label className='form-check-label' htmlFor='is_enabled'>
                            <input
                                className='form-check-input me-2'
                                type='checkbox'
                                id='is_enabled'
                                name='is_enabled'
                                checked={!!tempData.is_enabled}
                                onChange={handleChange}
                            />
                            是否啟用
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={submit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>);

}

export default CouponModal;