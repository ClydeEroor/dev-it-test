# BBC Ukraine News Frontend (Next.js)

## :bookmark: Project Description

In this project, users can view news articles parsed using the RSS API, as well as create, edit, and delete articles.
The project also includes user authentication and registration to enable editing, deleting, and adding articles in
addition to those parsed.

## Installation and Running

To install dependencies, run the following command:

```bash
npm i
```

To run app the following command:

```bash
npm run dev
```

- Entry point to the application :arrow_right: http://localhost:3000/

## Project Main structure
    - :open_file_folder: src 
        - :file_folder: app --> pages, styles
        - :file_folder: components --> react components
        - :file_folder: helpers --> validatiom form schema
        - :file_folder: store --> redux, rtk query
        - :file_folder: types
        - :file_folder: utils --> page path


- Libraries Used for Development
    - [redux](https://redux.js.org/)
    - [redux-toolkit](https://redux-toolkit.js.org/rtk-query/overview)
    - [rtk-query](https://redux-toolkit.js.org/rtk-query/overview)
    - [redux-persist](https://github.com/rt2zz/redux-persist#readme)
    - [formik](https://formik.org/)
    - [yup](https://github.com/jquense/yup)
    - [moment](https://momentjs.com/)
    - [pathpida](https://frourio.com/docs/guide/pathpida/with-nextjs)
    - [lodash](https://lodash.com/)

## Application Overview 🛠

This application is designed with simplicity in mind and includes the following core functionalities:

- 🔥 User Registration: New users can register for an account to access the application's features.
- 🔥 User Authentication: Registered users can securely log in to the application using their credentials.
- 🔥 Article Viewing: Users can explore articles available within the application. They have the ability to filter
  articles based on their publication date, access the direct link to the original news source, and utilize a search
  feature for easier navigation.
- 🔥 User Privileges: Authenticated users have additional privileges. They can delete, edit, and update articles within
  the application, providing them with control over their content experience.

## ❗❗❗ Important

* The search should be carried out only in Ukrainian, since in other languages it will not produce results unless you
  create an article yourself, for example in English, this is due to the fact that the resource from which to parse
  articles uses data in Ukrainian.

--
<a href="https://ibb.co/g35gyXP"><img src="https://i.ibb.co/zryfsL7/search-Details.png" alt="search-Details" border="0" /></a>

--
<a href="https://ibb.co/wWf650y"><img src="https://i.ibb.co/VSsBfjV/admin-Pannel.png" alt="admin-Pannel" border="0"></a>

- When you click on the News, you follow the link to its source.

## Author

[ClydeEroor](https://github.com/ClydeEroor)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.