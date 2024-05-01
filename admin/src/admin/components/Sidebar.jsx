import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="index.html">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End Dashboard Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide" />
              <span>Components</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="components-alerts.html">
                  <i className="bi bi-circle" />
                  <span>Alerts</span>
                </Link>
              </li>
              <li>
                <Link to="components-accordion.html">
                  <i className="bi bi-circle" />
                  <span>Accordion</span>
                </Link>
              </li>
              <li>
                <Link to="components-badges.html">
                  <i className="bi bi-circle" />
                  <span>Badges</span>
                </Link>
              </li>
              <li>
                <Link to="components-breadcrumbs.html">
                  <i className="bi bi-circle" />
                  <span>Breadcrumbs</span>
                </Link>
              </li>
              <li>
                <Link to="components-buttons.html">
                  <i className="bi bi-circle" />
                  <span>Buttons</span>
                </Link>
              </li>
              <li>
                <Link to="components-cards.html">
                  <i className="bi bi-circle" />
                  <span>Cards</span>
                </Link>
              </li>
              <li>
                <Link to="components-carousel.html">
                  <i className="bi bi-circle" />
                  <span>Carousel</span>
                </Link>
              </li>
              <li>
                <Link to="components-list-group.html">
                  <i className="bi bi-circle" />
                  <span>List group</span>
                </Link>
              </li>
              <li>
                <Link to="components-modal.html">
                  <i className="bi bi-circle" />
                  <span>Modal</span>
                </Link>
              </li>
              <li>
                <Link to="components-tabs.html">
                  <i className="bi bi-circle" />
                  <span>Tabs</span>
                </Link>
              </li>
              <li>
                <Link to="components-pagination.html">
                  <i className="bi bi-circle" />
                  <span>Pagination</span>
                </Link>
              </li>
              <li>
                <Link to="components-progress.html">
                  <i className="bi bi-circle" />
                  <span>Progress</span>
                </Link>
              </li>
              <li>
                <Link to="components-spinners.html">
                  <i className="bi bi-circle" />
                  <span>Spinners</span>
                </Link>
              </li>
              <li>
                <Link to="components-tooltips.html">
                  <i className="bi bi-circle" />
                  <span>Tooltips</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Components Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-journal-text" />
              <span>Forms</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="forms-elements.html">
                  <i className="bi bi-circle" />
                  <span>Form Elements</span>
                </Link>
              </li>
              <li>
                <Link to="forms-layouts.html">
                  <i className="bi bi-circle" />
                  <span>Form Layouts</span>
                </Link>
              </li>
              <li>
                <Link to="forms-editors.html">
                  <i className="bi bi-circle" />
                  <span>Form Editors</span>
                </Link>
              </li>
              <li>
                <Link to="forms-validation.html">
                  <i className="bi bi-circle" />
                  <span>Form Validation</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Forms Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Tables</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="tables-general.html">
                  <i className="bi bi-circle" />
                  <span>General Tables</span>
                </Link>
              </li>
              <li>
                <Link to="tables-data.html">
                  <i className="bi bi-circle" />
                  <span>Data Tables</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Tables Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-bar-chart" />
              <span>Charts</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="charts-chartjs.html">
                  <i className="bi bi-circle" />
                  <span>Chart.js</span>
                </Link>
              </li>
              <li>
                <Link to="charts-apexcharts.html">
                  <i className="bi bi-circle" />
                  <span>ApexCharts</span>
                </Link>
              </li>
              <li>
                <Link to="charts-echarts.html">
                  <i className="bi bi-circle" />
                  <span>ECharts</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Charts Nav */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-gem" />
              <span>Icons</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="icons-bootstrap.html">
                  <i className="bi bi-circle" />
                  <span>Bootstrap Icons</span>
                </Link>
              </li>
              <li>
                <Link to="icons-remix.html">
                  <i className="bi bi-circle" />
                  <span>Remix Icons</span>
                </Link>
              </li>
              <li>
                <Link to="icons-boxicons.html">
                  <i className="bi bi-circle" />
                  <span>Boxicons</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* End Icons Nav */}
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="users-profile.html">
              <i className="bi bi-person" />
              <span>Profile</span>
            </Link>
          </li>
          {/* End Profile Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-faq.html">
              <i className="bi bi-question-circle" />
              <span>F.A.Q</span>
            </Link>
          </li>
          {/* End F.A.Q Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-contact.html">
              <i className="bi bi-envelope" />
              <span>Contact</span>
            </Link>
          </li>
          {/* End Contact Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-register.html">
              <i className="bi bi-card-list" />
              <span>Register</span>
            </Link>
          </li>
          {/* End Register Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-login.html">
              <i className="bi bi-box-arrow-in-right" />
              <span>Login</span>
            </Link>
          </li>
          {/* End Login Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-error-404.html">
              <i className="bi bi-dash-circle" />
              <span>Error 404</span>
            </Link>
          </li>
          {/* End Error 404 Page Nav */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-blank.html">
              <i className="bi bi-file-earmark" />
              <span>Blank</span>
            </Link>
          </li>
          {/* End Blank Page Nav */}
        </ul>
      </aside>
      {/* End Sidebar*/}
    </>
  );
};

export default Sidebar;
