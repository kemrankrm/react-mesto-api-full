function PopupWithForm(props){
    if(props.name === 'profile-edit'){
        return (
            <div className={props.isOpen ? `popup popup_open popup_type_${props.name}` : `popup popup_type_${props.name}`} id="popup-ep">
                <div className="popup__container">
                    <button className="popup__close-button" type="button" id="pup-close" onClick={props.onClose}></button> 
                    <form className="popup__form popup__form_type_profile-edit" name="editForm" id="edit-form" novalidate>
                        <h2 className="popup__text">Редактировать профиль</h2>
                        <fieldset className="popup__input-container">
                            <input type="text" id="name-input" name="name" className="popup__input popup__input_type_name" placeholder="Введите имя" value="Жак-Ив Кусто" minlength="2" maxlength="40" required />
                            <span className="popup__job-input-error"></span>
                            <input type="text" id="job-input" name="job" className="popup__input popup__input_type_job" placeholder="Введите профессию" value="Иследователь" minlength="2" maxlength="200" required />
                            <span className="popup__name-input-error"></span>
                            <input type="submit" name="button" className="popup__submit-button" value="Сохранить" />
                        </fieldset>
                    </form>
                </div>
                <div className="popup__overlay popup__overlay_type_edit" onClick={props.onClose}></div>
            </div>
        )
    } else if(props.name === 'edit-avatar'){
        return(
            <div className={props.isOpen ? `popup popup_open popup_type_${props.name}` : `popup popup_type_${props.name}`} id="popup-ea">
            <div className="popup__container">
                <button className="popup__close-button" type="button" id="ea-close" onClick={props.onClose}></button> 
                <form className="popup__form popup__form_type_edit-avatar" name="avatarForm" id="avatar-form" novalidate>
                    <h2 className="popup__text">Обновить аватар</h2>
                    <fieldset className="popup__input-container">
                        <input type="url" id="avatar-url-input" name="link" className="popup__input popup__input_type_avatar-url" placeholder="Ссылка на картинку" value="" required />
                        <span className="popup__error-avatar popup__avatar-url-input-error" id="avatar-url-error"></span>
                        <input type="submit" name="button" className="popup__submit-button" value="Сохранить" id="ea-submit"/>
                    </fieldset>
                </form>
            </div>
            <div className="popup__overlay" onClick={props.onClose}></div>
        </div>
        )
    } else if(props.name === 'new-place'){
        return(
            <div className={props.isOpen ? `popup popup_open popup_type_${props.name}` : `popup popup_type_${props.name}`}id="popup-np">
            <div className="popup__container">
                <button className="popup__close-button" type="button" id="np-close" onClick={props.onClose}></button> 
                <form className="popup__form popup__form_type_new-place" name="addForm" id="add-form" novalidate>
                    <h2 className="popup__text">Новое место</h2>
                    <fieldset className="popup__input-container">
                        <input type="text" id="place-name" name="name" className="popup__input popup__input_type_place-name" placeholder="Название" value="" minlength="2" maxlength="30" required />
                        <span className="popup__url-input-error"></span>
                        <input type="url" id="url-input" name="link" className="popup__input popup__input_type_image-url" placeholder="Ссылка на картинку" value="" required />
                        <span className="popup__place-name-error"></span>
                        <input type="submit" name="button" className="popup__submit-button" value="Сохранить" id="np-submit" />
                    </fieldset>
                </form>
            </div>
            <div className="popup__overlay" onClick={props.onClose}></div>
        </div>
        )
    }
    
}

export default PopupWithForm;