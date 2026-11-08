import { Route, Routes, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout/AppLayout';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import HomePage from '../pages/HomePage/HomePage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { ROUTES } from './routes';

// Таблиця маршрутів: яка адреса → яка сторінка.
// Усі маршрути вкладені в AppLayout (шапка + фон + футер), тому шапка не перемальовується
// під час переходів, а змінюється лише вміст <Outlet /> усередині неї.
export default function AppRouter({ headerProps, movieProps, profileProps, language }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<AppLayout {...headerProps} />}>
        <Route
          index
          element={<HomePage onOpenCatalog={() => navigate(ROUTES.catalog)} {...movieProps} />}
        />
        <Route path={ROUTES.catalog} element={<CatalogPage {...movieProps} />} />
        <Route path={ROUTES.movie} element={<MovieDetailsPage {...movieProps} />} />
        <Route path={ROUTES.profile} element={<ProfilePage {...movieProps} {...profileProps} />} />
        <Route path="*" element={<NotFoundPage language={language} />} />
      </Route>
    </Routes>
  );
}
