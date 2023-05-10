const displaythedata = () => {
    let prev_data = document.getElementById('display-input-data-right-div-id')
    prev_data.childNodes[0].remove()
    let upper_remove_div = document.createElement('div')
    upper_remove_div.className = "remove-div-css"
    for(let i in data_obj){
        let entry_holding_div = document.createElement('div')
        entry_holding_div.className="entry-holding-div-css"
        let p_tag = document.createElement('p')
        let p_data = document.createTextNode(i)
        p_tag.appendChild(p_data)
        let p_second_tag = document.createElement('p')
        let p_second_data = document.createTextNode(data_obj[i])
        p_second_tag.appendChild(p_second_data)
        entry_holding_div.appendChild(p_tag)
        entry_holding_div.appendChild(p_second_tag)
        upper_remove_div.append(entry_holding_div) 
    }
    let maindiv = document.getElementById('display-input-data-right-div-id')
    maindiv.appendChild(upper_remove_div)
    let reset_form = document.getElementById('input-form-main-id')
    reset_form.reset()
    Object.keys(data_obj).forEach(key => {
        delete data_obj[key];
    })
    console.log(data_obj)
}

let data_obj = {}

const handleInput = (e) => {
    const {name, value} = e.target
    console.log(name, value)
    data_obj = {
        ...data_obj,
        [name]:value
    }
    console.log(data_obj)
}

const handlecheckboxInput = (e) => {
    const {name,value} = e.target
    if (e.target.checked){
        console.log(data_obj)
        if (!data_obj[name]){
            data_obj = {
                ...data_obj,
                [name] : [value]
            }
        }
        else{
            data_obj = {
                ...data_obj,
                [name] : [...data_obj[name], value]
            }
        }
        console.log(data_obj[name])
    }
    else {
        let index = data_obj[name].indexOf(value)
        data_obj[name].splice(index,1)
    }
    console.log(data_obj)
}

const coverfunction = (e) => {
    handlecheckboxInput(e)
}

//Adding Form
const getthatform = (form) =>{
    // console.log(form)
    console.log('clicked')
    let all_inputs = document.querySelectorAll('input')
        for(let i=0; i<all_inputs.length; i++){
            if (all_inputs[i].getAttribute('type')==="submit"){
                all_inputs[i].remove()
            }
        }
    var main_option_selection = document.getElementById('select-form-input-id')
    main_option_selection.setAttribute("disabled","")
    var main_option_btn = document.getElementById('main-add-btn-id')
    main_option_btn.setAttribute("disabled","")
    let removebtns = document.querySelectorAll(".remove-btn-css")
        for(let i=0; i<removebtns.length; i++){
            removebtns[i].remove()
        }
    let allinps = document.querySelectorAll('input')
        for(let i=0; i<allinps.length; i++){
            allinps[i].removeAttribute('disabled')
        }
    let selectinps = document.querySelectorAll('select')
        for(let i=0; i<selectinps.length; i++){
            selectinps[i].removeAttribute('disabled')
        }
    let left_bottom_div = document.getElementById('input-form-main-id')
    left_bottom_div.appendChild(form)
    let datasubmitinpbtn = document.createElement('input')
    datasubmitinpbtn.setAttribute('type','submit')
    datasubmitinpbtn.setAttribute('value',"Submit")
    datasubmitinpbtn.setAttribute('id','final_submit_btn')
    // validate()
    datasubmitinpbtn.addEventListener('click',displaythedata)
    left_bottom_div.appendChild(datasubmitinpbtn)
}

// const validate = () => {

// }

//checking for submit
const checkforsubmit = () => {
    flag = true
    let inps = document.getElementsByTagName('input')
    console.log(inps)
        for(let i=0; i<inps.length; i++){
            if (inps[i].getAttribute('type')==="submit"){
                flag = false
                // document.getElementById('select-form-input-id').removeAttribute('disabled')
            }
        }
        if (flag === true){
            document.getElementById('select-form-input-id').removeAttribute('disabled')
        }
}

//Creating and Adding respective options
const addthatoption = (element,inptype,parentdiv,name) => {
    let option_value_holding = document.createElement('span')
    let option_value_holding_data = document.createTextNode(element.value) 
    option_value_holding.appendChild(option_value_holding_data)
    let option_holding_div = document.createElement('div')
    option_holding_div.className="option-holding-div"
    let option_input = document.createElement('input')
    option_input.setAttribute('type',inptype)
    option_input.setAttribute('value',element.value)
    option_input.setAttribute('name',name)
    option_input.setAttribute('disabled',"")
    if (inptype==="checkbox"){
        option_input.addEventListener('change',(e)=>coverfunction(e))
    }
    else if (inptype==="radio"){
        option_input.addEventListener('change',(e)=>handleInput(e))
    }
    option_holding_div.appendChild(option_input)
    option_holding_div.appendChild(option_value_holding)
    parentdiv.appendChild(option_holding_div)
    element.value=""
}

//Creating and Adding select option
const addselectoption = (element,select_tag) => {
    let option_tag = document.createElement('option')
    let option_tag_data = document.createTextNode(element.value)
    option_tag.setAttribute('value',element.value)
    option_tag.appendChild(option_tag_data)
    select_tag.appendChild(option_tag)
    element.value=""
}

//Creating and Adding the main input
const getthatforminput = (name,parentdiv,inptype) => {
    if (inptype==="text" || inptype==="number" || inptype==="email"){
        let main_input = document.createElement('input')
        main_input.setAttribute('name',name)
        main_input.setAttribute('placeholder',`Enter your ${name}`)
        main_input.setAttribute('disabled',"")
        main_input.addEventListener('input',(e)=>handleInput(e))
        parentdiv.appendChild(main_input)
    }
    else if (inptype==="radio" || inptype==="checkbox"){
        parentdiv.className="adding-class-for-multiple-input"
        let multiple_imp_holding_div = document.createElement('div')
        multiple_imp_holding_div.className="option-inp-div-css"
        let multiple_option_input = document.createElement('input')
        multiple_option_input.setAttribute('placeholder','Enter your option')
        let multiple_option_input_btn = document.createElement('button')
        let multiple_option_input_btn_data = document.createTextNode('Add')
        multiple_option_input_btn_data.className="adding-input-label-add-btn"
        multiple_option_input_btn.appendChild(multiple_option_input_btn_data)
        multiple_imp_holding_div.appendChild(multiple_option_input)
        multiple_imp_holding_div.appendChild(multiple_option_input_btn)
        parentdiv.appendChild(multiple_imp_holding_div)
        multiple_option_input_btn.addEventListener('click',()=>addthatoption(multiple_option_input,inptype,parentdiv,name))
    }
    else if (inptype==="select"){
        parentdiv.className="adding-class-for-multiple-input"
        let select_tag = document.createElement('select')
        select_tag.setAttribute('disabled',"")
        select_tag.setAttribute('name',name)
        let defaultselectoption = document.createElement('option')
        let defaultselectoption_data = document.createTextNode("----")
        defaultselectoption.appendChild(defaultselectoption_data)
        select_tag.appendChild(defaultselectoption)
        select_tag.addEventListener('change',(e)=>handleInput(e))
        let multiple_imp_holding_div = document.createElement('div')
        multiple_imp_holding_div.className="option-inp-div-css"
        let multiple_option_input = document.createElement('input')
        multiple_option_input.setAttribute('placeholder','Enter your option')
        let multiple_option_input_btn = document.createElement('button')
        let multiple_option_input_btn_data = document.createTextNode('Add')
        multiple_option_input_btn.appendChild(multiple_option_input_btn_data)
        multiple_imp_holding_div.appendChild(multiple_option_input)
        multiple_imp_holding_div.appendChild(multiple_option_input_btn)
        parentdiv.appendChild(select_tag)
        parentdiv.appendChild(multiple_imp_holding_div)
        multiple_option_input_btn.addEventListener('click',()=>addselectoption(multiple_option_input,select_tag))
    }
}

//Adding input labels
const addthatlabel = (element,parentdiv,labelinput,labeladdbtn,rightforminputholder,inputtype) => {
    labelinput.remove()
    labeladdbtn.remove()
    let label_tag = document.createElement('label')
    let label_tag_data = document.createTextNode(element.value)
    label_tag.appendChild(label_tag_data)
    parentdiv.appendChild(label_tag)
    getthatforminput(element.value,rightforminputholder,inputtype)
}

//Removing Inputs
const removethatinput = (x) => {
    x.remove()
    checkforsubmit()
}

const addthatinput = () => {
    if (document.querySelector('.option-inp-div-css')){
        let remove_option_div = document.querySelector('.option-inp-div-css')
        remove_option_div.remove()
    }

    //Getting the required input type from select option
    req_inp_type = document.getElementById('select-form-input-id').value
    console.log(req_inp_type)

    //Creating the structure
    let form_input_holder = document.createElement('div')
    form_input_holder.className="form-initial-input-holder"
    let left_form_label_holder = document.createElement('div')
    let right_form_input_holder = document.createElement('div')
    let form_input_remove_holder = document.createElement('div')
    form_input_remove_holder.className="remove-btn-css"
    form_input_remove_holder.textContent="x"
    console.log(form_input_remove_holder)
    form_input_remove_holder.addEventListener('click',()=>removethatinput(form_input_holder))
    form_input_holder.appendChild(left_form_label_holder)
    form_input_holder.appendChild(right_form_input_holder)
    form_input_holder.appendChild(form_input_remove_holder)

    if (req_inp_type==="submit"){
        alert('Form Completed?')
        let main_option_selection = document.getElementById('select-form-input-id')
        main_option_selection.setAttribute("disabled","")
        let submit_btn = document.createElement('input')
        submit_btn.setAttribute('type',req_inp_type)
        submit_btn.setAttribute('value',"Submit")
        right_form_input_holder.appendChild(submit_btn)
        console.log(right_form_input_holder)
        submit_btn.addEventListener('click',()=>getthatform(document.getElementById('initial-form-holder-id')))
        let mains = document.getElementById('initial-form-holder-id')
        console.log(mains)
        mains.append(form_input_holder)
    }
    
    else {
        //Creating input for Label
        let label_inp = document.createElement('input')
        label_inp.setAttribute('type','text')
        label_inp.setAttribute('placeholder','Enter the Label name')
        label_add_btn = document.createElement('button')
        label_add_btn_data = document.createTextNode('Add')
        label_add_btn_data.className="adding-input-label-add-btn"
        label_add_btn.appendChild(label_add_btn_data)
        left_form_label_holder.appendChild(label_inp)
        left_form_label_holder.appendChild(label_add_btn)
        label_add_btn.addEventListener('click',()=>addthatlabel(label_inp,left_form_label_holder,label_inp,label_add_btn,right_form_input_holder,req_inp_type))

        //Main appending
        let mains = document.getElementById('initial-form-holder-id')
        mains.appendChild(form_input_holder)
    }
}