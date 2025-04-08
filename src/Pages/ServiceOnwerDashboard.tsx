import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Home, 
  Settings, 
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  Star,
  BarChart3,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  capacity: number;
  available: boolean;
}

interface Booking {
  id: string;
  serviceId: string;
  customerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface Review {
  id: string;
  serviceId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Grand Ballroom',
      price: 2500,
      description: 'Elegant ballroom for large events',
      capacity: 300,
      available: true
    },
    {
      id: '2',
      name: 'Garden Venue',
      price: 1800,
      description: 'Beautiful outdoor venue',
      capacity: 150,
      available: true
    }
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      serviceId: '1',
      customerName: 'John Smith',
      date: '2024-03-20',
      status: 'confirmed'
    },
    {
      id: '2',
      serviceId: '2',
      customerName: 'Sarah Johnson',
      date: '2024-03-25',
      status: 'pending'
    }
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      serviceId: '1',
      customerName: 'Michael Brown',
      rating: 5,
      comment: 'Amazing venue and service!',
      date: '2024-03-15'
    },
    {
      id: '2',
      serviceId: '1',
      customerName: 'Emily Davis',
      rating: 4,
      comment: 'Great experience overall',
      date: '2024-03-10'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const chartData = [
    { name: 'Jan', bookings: 4 },
    { name: 'Feb', bookings: 6 },
    { name: 'Mar', bookings: 8 },
    { name: 'Apr', bookings: 5 },
    { name: 'May', bookings: 7 },
    { name: 'Jun', bookings: 9 }
  ];

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newService: Service = {
      id: Date.now().toString(),
      name: (form.serviceName as HTMLInputElement).value,
      price: Number((form.price as HTMLInputElement).value),
      description: (form.description as HTMLInputElement).value,
      capacity: Number((form.capacity as HTMLInputElement).value),
      available: true
    };
    setServices([...services, newService]);
    setShowAddForm(false);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleToggleAvailability = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, available: !service.available } : service
    ));
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Active Services</h3>
                <p className="text-3xl font-bold text-green-600">
                  {services.filter(s => s.available).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {(reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Services</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Capacity: {service.capacity}</span>
                    <span>${service.price}</span>
                  </div>
                  <button
                    onClick={() => handleToggleAvailability(service.id)}
                    className={`mt-4 w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                      service.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {service.available ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Bookings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {services.find(s => s.id === booking.serviceId)?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(new Date(booking.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Calendar</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  Previous
                </button>
                <h3 className="text-lg font-semibold">
                  {format(selectedDate, 'MMMM yyyy')}
                </h3>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  Next
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {/* Calendar grid would go here */}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{review.customerName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Service: {services.find(s => s.id === review.serviceId)?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Admin</h1>
        </div>
        <nav className="mt-6">
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('services')}
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Services</span>
          </div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'bookings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            <Clock className="w-5 h-5 mr-3" />
            <span>Bookings</span>
          </div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span>Calendar</span>
          </div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'reviews' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star className="w-5 h-5 mr-3" />
            <span>Reviews</span>
          </div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {renderContent()}
      </div>

      {/* Add Service Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Add New Service</h3>
            <form onSubmit={handleAddService}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  name="serviceName"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;