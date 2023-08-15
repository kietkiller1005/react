import styles from './sidebar.module.scss'
import clsx from 'clsx'

export default function Sidebar({invisible}){
    const componentClass = clsx(styles.fathertag, {
        [styles.slide_in_out]: invisible,
        [styles.hidden]: !invisible
    });
   
    return(
        <div className={componentClass}>

            <div className={clsx(styles.tagh)}>
            Xe đạp mini
                
            </div>
            <div className={clsx(styles.tagh)}>
            Đồ ăn vặt
                
            </div>
        </div>
    )
}