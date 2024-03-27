import { useState } from "react"

function Form() {

    const [inputState, setInputState] = useState('EunJi')

    //撰寫關於select的部分
    const optionsList = ['Taipei', 'Kaohsiung', 'Taichung', 'Seoul'] //option資料
    const [selectState, setSelectState] = useState(''); //option的寫入方式定義
    const multOptionsList = ['Designer', 'Developer', 'Project Manger', 'CEO'] //option資料
    const [selectJobState, setSelectJobState] = useState([]);
    const selectHandler = e => {
        setSelectJobState([...e.target.selectedOptions].map((option) => option.value))

    } //mult select funciton 

    const [checked, setChecked] = useState(false); //checkbox單項預設值
    const [checkList, setCheclList] = useState([]);
    const handleCheckList = (e) => {
        if (e.target.checked) {
            setCheclList([...checkList, e.target.value]);
        } else {
            //找出當前input的value並移除
            setCheclList(checkList.filter((item) =>
                item !== e.target.value
            ))
        }
    }

    return (

        <div className="container main my-5">
            <div className="row">
                <main className="col post">

                    <div className="mb-4">
                        <h1 className="mt-0 text-muted">意見詢問單</h1>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">姓名</label>
                            <input id="username" type="email" className="form-control" name="username" value={inputState} onChange={e => setInputState(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">密碼</label>
                            <input id="password" type="password" className="form-control" name="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tel">電話Tel</label>
                            <input id="tel" type="tel" className="form-control" name="tel" />
                        </div>
                        <div className="row mb-3 g-3">
                            <div className="col-6">
                                <label htmlFor="city" className="form-label">縣市</label>
                                <select value={selectState} id="city" className="form-select" name="city" onChange={e => { setSelectState(e.target.value) }}>
                                    <option value="" disabled >Choose One ...</option>
                                    {optionsList.map((location) => {
                                        return (<option value={location} key={location}> {location}</option>)

                                    })}

                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="job" className="form-label">職業{selectJobState}</label>
                                <select
                                    value={selectJobState}
                                    multiple={true}
                                    id="job" className="form-select" name="job"
                                    onChange={selectHandler}>
                                    <option value="" disabled >Choose One or More ...</option>
                                    {multOptionsList.map((job) => {
                                        return (<option value={job} key={job}> {job}</option>)

                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label htmlFor="address">地址</label>
                                <input id="address" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-label">素食者</div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="vegetarian" name="vegetarian" value="true" />
                                <label className="form-check-label" htmlFor="vegetarian">是</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="non-vegetarian" name="vegetarian" value="false" />
                                <label className="form-check-label" htmlFor="non-vegetarian">否</label>
                            </div>
                        </div>
                        <div className="mb-3">

                            <h1>{checkList}</h1>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="checklist1"
                                value='한국요리'
                                onChange={handleCheckList}
                            />
                            <label htmlFor="checklist1">한국요리</label>

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="checklist2"
                                value='중국요리'
                                onChange={handleCheckList}
                            />
                            <label htmlFor="checklist2">중국요리</label>

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="checklist3"
                                value='미국음식'
                                onChange={handleCheckList}
                            />
                            <label htmlFor="checklist3">미국음식</label>

                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkbox"
                                    required
                                    value={checked}
                                    onChange={e => {
                                        setChecked(e.target.checked);
                                    }} />
                                <label
                                    className="form-check-label"
                                    htmlFor="checkbox">確認同意本文件{checked.toString()}</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">註冊</button>
                    </form>
                </main >
            </div >
        </div >




    )
}

export default Form