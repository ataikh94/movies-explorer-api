const badRequestErrorMessage = 'Переданы некорректные данные';
const conflictErrorMessage = 'Пользователь с таким email уже существует';
const forbiddenErrorMessage = 'Недостаточно прав для выполнения действия';
const notFoundErrorMessage = 'Объект с указанным ID не найден';
const unauthorizedErrorMessage = 'Требуется авторизация';
const serverErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  badRequestErrorMessage,
  conflictErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorMessage,
  unauthorizedErrorMessage,
  serverErrorMessage,
};
