import StatusBadge from './StatusBadge';
import { Download, Calendar } from 'lucide-react';

interface Payment {
  date: string;
  amount: string;
  property: string;
  method: string;
  status: string;
}

interface UpcomingPayment {
  date: string;
  amount: string;
}

interface PaymentsSectionProps {
  upcomingPayment: UpcomingPayment;
  payments: Payment[];
}

const PaymentsSection = ({ upcomingPayment, payments }: PaymentsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment Tracking</h2>
      </div>

      {/* Upcoming Payment */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Rent Payment</h3>
        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div>
            <p className="font-semibold text-gray-800">{upcomingPayment.amount}</p>
            <p className="text-sm text-gray-600">Due: {upcomingPayment.date}</p>
          </div>
          <button className="bg-amber-600 text-white px-6 py-2 rounded-xl hover:bg-amber-700 transition-colors font-medium">
            Pay Now
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.property}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                      <Download className="w-4 h-4 inline mr-1" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsSection;