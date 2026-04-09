'use client';

import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import toast from 'react-hot-toast';
import { 
  Package, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Plus, 
  LayoutDashboard, 
  User, 
  ShieldCheck, 
  Globe2,
  Clock,
  LogOut,
  ChevronDown
} from 'lucide-react';

const GET_USERS = gql`
  query {
    users {
      id
      name
      role
      country
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($userId: String!) {
    createOrder(userId: $userId)
  }
`;

const GET_ORDERS = gql`
  query GetOrders($userId: String!) {
    getOrders(userId: $userId)
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($userId: String!, $orderId: String!) {
    placeOrder(userId: $userId, orderId: $orderId)
  }
`;

const CANCEL_ORDER = gql`
  mutation CancelOrder($userId: String!, $orderId: String!) {
    cancelOrder(userId: $userId, orderId: $orderId)
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery<any>(GET_USERS);

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER);
  const [placeOrder] = useMutation(PLACE_ORDER);
  const [cancelOrder] = useMutation(CANCEL_ORDER);

  const currentUser = data?.users.find(
    (u: any) => u.id === selectedUserId
  );

  const { data: ordersData, refetch } = useQuery<any>(GET_ORDERS, {
    variables: { userId: selectedUserId },
    skip: !selectedUserId,
    pollInterval: 5000,
  });

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <p className="text-slate-600 font-medium animate-pulse">Initializing Security Protocols...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border-l-4 border-rose-500 p-6 rounded-2xl shadow-xl flex flex-col items-center max-w-md text-center">
          <XCircle className="w-16 h-16 mb-4 text-rose-500/20 stroke-[1.5] text-rose-500" />
          <h2 className="text-2xl font-bold mb-2 text-slate-800">Connection Failed</h2>
          <p className="text-sm text-slate-500 mb-4 bg-slate-50 p-4 rounded-lg border border-slate-100">{error.message}</p>
          <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'PLACED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'CANCELLED':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CREATED':
        return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'PLACED':
        return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'CANCELLED':
        return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* GLOW EFFECTS BACKGROUND */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* BRANDING */}
            <div className="flex items-center gap-3 group cursor-pointer relative z-10">
              <div className="bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-indigo-400/50 transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 tracking-tight">
                Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Bites</span>
              </h1>
            </div>

            {/* HEADER CONTROLS */}
            <div className="relative z-10">
              {currentUser ? (
                <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 flex items-center justify-center border border-indigo-100">
                     <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="hidden sm:block text-left mr-2">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{currentUser.role} • {currentUser.country}</p>
                  </div>
                  <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
                  <button 
                    onClick={() => {
                        setSelectedUserId('');
                        toast('Signed out successfully', { icon: '👋' });
                    }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <select
                    className="relative appearance-none bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 pl-4 pr-12 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all cursor-pointer shadow-sm w-[200px]"
                    value={selectedUserId}
                    onChange={(e) => {
                      setSelectedUserId(e.target.value);
                      if (e.target.value) toast.success(`Login Authorized`);
                    }}
                  >
                    <option value="" disabled>Authenticate As...</option>
                    {data.users.map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none group-hover:text-indigo-600 transition-colors" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {!selectedUserId ? (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="relative mb-8 group">
               <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
               <div className="w-28 h-28 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl relative z-10 transform transition-transform duration-700 group-hover:rotate-12">
                 <ShieldCheck className="w-14 h-14 text-indigo-500" />
               </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 text-center tracking-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Food Ordering</span>
            </h2>
            <p className="text-slate-500 text-center max-w-2xl text-lg leading-relaxed mb-10 font-medium">
              Experience our relational access model demonstrating role-based visibility. Select a user to witness dynamic permissions and multi-region restaurant routing in action.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center text-sm font-semibold text-slate-600 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200"><ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" /> Strict RBAC</span>
              <span className="flex items-center text-sm font-semibold text-slate-600 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200"><Globe2 className="w-4 h-4 mr-2 text-emerald-500" /> Geo-Fencing</span>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* DASHBOARD HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Restaurant Dashboard</h2>
                <div className="flex items-center gap-4 mt-2">
                   <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                     <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {currentUser.country} Region
                   </p>
                   <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                     <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {currentUser.role} Level
                   </p>
                </div>
              </div>
              
              <button
                disabled={creatingOrder}
                className="group relative flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                onClick={() =>
                  createOrder({ variables: { userId: currentUser.id } })
                    .then(() => {
                      toast.success('Food Order Created 🍔');
                      refetch();
                    })
                    .catch(() => toast.error('Order denied. Insufficient perms'))
                }
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                
                {creatingOrder ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />}
                <span className="relative z-10">Create Food Order</span>
              </button>
            </div>

            {/* ORDERS SECTION */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                Active Food Orders
                {ordersData?.getOrders && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs py-0.5 px-2.5 rounded-full ml-2 font-bold">
                    {JSON.parse(ordersData.getOrders).length}
                  </span>
                )}
              </h3>
            </div>

            {!ordersData || !ordersData.getOrders || JSON.parse(ordersData.getOrders).length === 0 ? (
              <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center max-w-2xl mx-auto mt-8">
                <div className="bg-white w-20 h-20 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                    <Package className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-xl font-bold text-slate-700 mb-2">No Active Orders</h4>
                <p className="text-slate-500 text-base max-w-sm mx-auto">Your cart is currently empty. Create a new food order to begin.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {JSON.parse(ordersData.getOrders).map((order: any, index: number) => (
                  <div
                    key={order.id}
                    className="group bg-white rounded-3xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(79,70,229,0.15)] border border-slate-100 hover:border-indigo-100 transition-all duration-300 flex flex-col relative overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-colors duration-500"></div>

                    <div className="flex justify-between items-start mb-5 relative z-10">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Identifier</p>
                        <p className="text-sm font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{order.id.substring(0, 8)}</p>
                      </div>
                      <span className={`flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(order.status)} shrink-0 shadow-sm`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>

                    <div className="mb-6 flex-grow relative z-10">
                      <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50/50 border border-slate-100 p-3 rounded-xl gap-3">
                        <div className="bg-white p-1.5 rounded-lg shadow-sm">
                           <MapPin className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Deployment Zone</p>
                          <p className="text-slate-800 font-semibold">{order.country}</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2.5 pt-4 border-t border-slate-100 relative z-10">
                      {(currentUser.role === 'ADMIN' || currentUser.role === 'MANAGER') ? (
                        <>
                          <button
                            disabled={order.status !== 'CREATED'}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all
                              ${order.status === 'CREATED' 
                                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-indigo-600/20' 
                                : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'}`}
                            onClick={() =>
                              placeOrder({ variables: { userId: currentUser.id, orderId: order.id } })
                                .then(() => { toast.success('Order Placed! 🚀'); refetch(); })
                                .catch(() => toast.error('Checkout Failed'))
                            }
                          >
                            <CheckCircle className="w-4 h-4" /> 
                            Checkout & Pay
                          </button>

                          <button
                            disabled={order.status === 'CANCELLED' || order.status === 'PLACED'}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all
                              ${(order.status !== 'CANCELLED' && order.status !== 'PLACED')
                                ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm hover:shadow-rose-500/20' 
                                : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-60'}`}
                            onClick={() =>
                              cancelOrder({ variables: { userId: currentUser.id, orderId: order.id } })
                                .then(() => { toast.error('Order Cancelled', { icon: '🛑' }); refetch(); })
                                .catch(() => toast.error('Cancel Failed'))
                            }
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide text-slate-400 bg-slate-50 border border-slate-100 text-center flex items-center justify-center gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          Restricted Access
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}