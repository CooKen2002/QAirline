import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";  

import AdminDashboard from "../features/admin/AdminDashboard";
import AdminNews from "../features/admin/AdminNews";
import AdminAircraft from "../features/admin/AdminAircraft";
import AdminFlight from "../features/admin/AdminFlight";
import AdminBooking from "../features/admin/AdminBooking";
import AdminNewsCreate from "../features/admin/AdminNewsCreate";

import News from "../pages/News";
import Journey from "../pages/Journey";
import User from "../pages/User";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />
        <Route path="/admin/news/create" element={<AdminNewsCreate />} />
        <Route path="/admin/aircraft" element={<AdminAircraft />} />
        <Route path="/admin/flight" element={<AdminFlight />} />
        <Route path="/admin/booking" element={<AdminBooking />} /> 

        <Route path="/news" element={<News />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}
