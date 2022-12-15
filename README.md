# Lib-backend

## API Endpoints 
* POST <strong>/signup</strong> - for user signup 
* POST <strong>/signin</strong> - user signin
* GET <strong>/signout</strong> - log out user
* GET <strong>/authors</strong> - To return the response of all the authors in the database with number of books published by that author
* GET <strong>/authors/id</strong> - To return the details of the author with the given author id with list of books.
* GET <strong>/authors/me</strong> - To return the details of the logged-in author.
* GET <strong>/books</strong> - To return the list of all the books.
* PUT <strong>/books/like/id</strong> - To like a book.
* PUT <strong>/books/unlike/id</strong> - To unlike a book.

## deployed on 
https://lib-backend-production.up.railway.app/signout

### Todo
* the data should be paginated and there must be some sorting parameters to fetch the list in order of most likes or least likes
* unique likes feature
* thorough testing of auth
