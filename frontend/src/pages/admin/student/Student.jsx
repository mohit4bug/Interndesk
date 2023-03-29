import './Student.scss'

const Student = ({ data }) => {

    return (
        <div className='student'>
            <div className="item">{data.registrationNumber.toUpperCase()}</div>
            <div className="item">{data.personalDetails?.firstName} {data.personalDetails?.lastName}</div>
            <div className="item">{data.email}</div>
            <div className="item">{data.educationalDetails.postGraduation.course || data.educationalDetails.graduation.course}</div>
            <div className="item">{data.role === 'admin' ? "Teacher" : data.role}</div>
        </div>
    )
}

export default Student