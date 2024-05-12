# GITHUB REPOSITORIES OPERATIONS

## Overview

This project is a web application built with [Vite](https://vitejs.dev/) for the front-end and deployed on [Vercel](https://vercel.com/). It serves as a platform for managing repositories on GitHub, allowing users to view repository details, create new repositories, and perform various other actions related to repository management.

## Features

- **View All Repositories**: You can view all my repositories on the All Repos page which serves as the homepage for this project.
  
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495204/all-repos_t3t3oh.png" alt="All-Repo-Page"/>

- **View Repository Details**: View detailed information about individual repositories by navigating to the **View repo details** button on the header. All repos are fetched  into a sidebar on the page. Clicking on each **repo name** will display the details for the particular repo clicked.
Details that are generated for viewing for each repository are repository name, owner details, description, language, default branch, topics, stargazers count, forks, watchers, creation date, and last update date.

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495208/view-repo-page_zylsym.png" alt="Repo-Details-Page"/>

- **Create New Repository**: A new repo can be created by clicking on the **Add New Repo** button at the top of the sidebar of the View repo details page. When the button is clicked, it pops out a form for collecting details for the repo such as name, description, and visibility. On successful submission, a success alert pops out, then you can refresh the page to get the repositories updated.

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495205/addnew_sehncn.png" alt="New-repo"/>

### NOTE: When creating a repository, start the repo name with the keyword "**Demo**" as this is part of the query for creating a new repo so that you can perform other operations on the repository, like editing the repository.

- **Pagination Functionality**: On the homepage, a maximum of 9 repositories are displayed per page. A **Next** and **Previous** button functionality is implemented to enable a smooth display of each page.

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495202/pagination_ct8geb.png" alt="Pagination"/>

- **Update Repository:** You can update the name and description of the repositories created. Clicking on the edit button on each repository pops out a form for updating the repo details. (**Note: only repositories with the keyword "Demo" can be edited and deleted.**)

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495206/editform_hehv2w.png" alt="Update-repo"/>

- **Delete Repository:** You can delete the created repositories. Click on the delete button on the repo you want to delete, you will get a confirmation alert, click ok. Then refresh the page after successful deletion.

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715496549/deleteconfirm_waaqgs.png" alt="delete-repo"/>

- **Search Repositories:** Search functionality was implemented, you can search for specific repositories by any keyword or name. (**Click on the search box and type in any letter or word**)

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495209/search_qxsx3t.png" alt="search"/>
  
- **Filter Repositories:** You can also filter repositories by oldest or forked repositories. (**Click on the filter button and the filter options will be shown. After you are done with filtering, clear the filter**)

<img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495203/filter_ab8aen.png" alt="filter"/>

- **Responsive Design**: The application is designed to be responsive, ensuring a seamless user experience across various devices and screen sizes (mobile, tablet, small laptops, and large screens).

  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715496872/mobile-home_cjb7jh.png" alt="mobile-view"/>

  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715496871/tabhome_cazkfo.png" alt="tab-view"/>

  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715496870/largeview_p27lxp.png" alt="large"/>

- **Client-side Routing**: Client-side routing is implemented to enable navigation within the application without full page reloads, providing a smoother user experience.

- **Error Boundary Handling**: An error boundary functionality was implemented. When there is a code break or error in the application, it displays the error boundary warning instead of getting the usual blank screen. A component with errors (**ComponentWithError**) was created to test the error boundary function.

  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495204/errortest_ibmsne.png" alt="Error-boundary"/>

- **Not Found Page**: A 404 page was implemented in case a route not associated with the project wants to be accessed, it displays the 404 page messgae with a button to return to the homepage.

  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1715495206/404_s7pw4s.png" alt="not-found"/>

## Technologies Used

- **Frontend**:
  - [Vite](https://vitejs.dev/): Fast, modern build tooling for frontend development.
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [React Router](https://reactrouter.com/): Declarative routing for React applications.
  - [Axios](https://axios-http.com/docs/intro/): A promise-based HTTP Client for node.js and the browser.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for building custom designs quickly.
  - [Font Awesome](https://fontawesome.com/): Icons toolkit for web projects.
  - [Sweetalert2](https://sweetalert2.github.io/): A beautiful, responsive, highly customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes. 

- **Backend**:
  - The application interacts with the GitHub API to fetch repository data and perform repository management operations.

## Deployment

The project is deployed on [Vercel](https://vercel.com/), a platform for hosting web applications and serverless functions. The deployment process is automated, allowing for seamless updates to the application. [Live Link](https://github-repositories-portfolio.vercel.app/)

## Installation and Usage

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Access the application in your browser at `http://localhost:5173`.
5. You may want to change the username value in the **GithubContext** file in the **hooks** folder to fetch your personal repositories.

```javascript
useEffect(() => {
    const fetchRepos = async () => {
      const username = "Kemi-Oluwadahunsi";
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        const sortedRepos = response.data.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
        const data = sortedRepos.map((repo) => ({
          ...repo,
          lastUpdated: formatLastUpdated(repo.updated_at),
        }));
        setRepos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchRepos();
  }, []);
```

8. Also, remember to add your authentication token to a **.env** file as it is in the **.env.example** file.

```javascript
VITE_APP_TOKEN=gh_736546738289298283877446....... \\The value of is the GitHub personal authentication token (Classic) of your GitHub App.
```

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or fix.
- Make your changes and commit them with descriptive messages.
- Push your changes to your fork.
- Open a pull request to the `main` branch of the original repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or inquiries about the project, feel free to contact the project maintainer:

- **Github Username**: Kemi-Oluwadahunsi
- **Email**: [My Email](kemilat50@gmail.com)

