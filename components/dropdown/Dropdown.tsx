import dropdownStyle from '@/components/dropdown/dropdown.module.scss'

interface test {

}
const dropdown  = (props:{aaa : {value:String}[]}): JSX.Element  => (
    <div className={dropdownStyle.header}>{props.aaa[0].value}</div>
)

export default dropdown