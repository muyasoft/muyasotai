import React from 'react';
import { Phone, PhoneIncoming, TrendingUp, AlertTriangle, Network, Activity } from 'lucide-react';
import Header from '../../components/crm/Header';
import StatCard from '../../components/crm/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { dashboardStats, callTrafficData, aiPerformanceData, trunks } from '../../data/crmMock';

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Dashboard" 
        subtitle="Anlık çağrı trafiği ve sistem performansı"
      />
      
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Phone}
            title="Toplam Çağrı"
            value={dashboardStats.totalCalls.toLocaleString()}
            subtitle="Bugün"
            trend="up"
            trendValue="12.5"
            color="blue"
          />
          <StatCard
            icon={PhoneIncoming}
            title="Aktif Çağrı"
            value={dashboardStats.activeCalls}
            subtitle="Şu anda"
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            title="Başarı Oranı"
            value={`${dashboardStats.successRate}%`}
            subtitle="Son 24 saat"
            trend="up"
            trendValue="3.2"
            color="teal"
          />
          <StatCard
            icon={AlertTriangle}
            title="Spam Tespiti"
            value={dashboardStats.spamDetected}
            subtitle="Bugün engellendi"
            trend="down"
            trendValue="8.1"
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Call Traffic Chart */}
          <Card className="lg:col-span-2 bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span>Anlık Çağrı Trafiği</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-2">
                {callTrafficData.map((data, index) => {
                  const maxCalls = Math.max(...callTrafficData.map(d => d.calls));
                  const height = (data.calls / maxCalls) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${data.time}: ${data.calls} çağrı`}
                      />
                      <div className="text-xs text-[rgb(161,161,170)] mt-2">{data.time}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Performance */}
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span>AI Performans</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPerformanceData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[rgb(218,218,218)]">{item.metric}</span>
                      <span className="text-sm font-semibold text-white">{item.value}%</span>
                    </div>
                    <div className="w-full bg-[rgb(38,40,42)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Online Trunks */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <Network className="w-5 h-5 text-teal-500" />
                <span>Online Trunk Listesi</span>
              </CardTitle>
              <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20">
                {dashboardStats.onlineTrunks}/{dashboardStats.totalTrunks} Online
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Trunk Adı</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Sağlayıcı</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Durum</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Sağlık</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Codec</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[rgb(161,161,170)]">Concurrent</th>
                  </tr>
                </thead>
                <tbody>
                  {trunks.slice(0, 5).map((trunk) => (
                    <tr key={trunk.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgb(38,40,42)] transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-white font-medium">{trunk.name}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[rgb(161,161,170)] text-sm">{trunk.provider}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${
                          trunk.status === 'online' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : trunk.status === 'warning'
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {trunk.status === 'online' ? 'Online' : trunk.status === 'warning' ? 'Uyarı' : 'Offline'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-[rgb(38,40,42)] rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                trunk.health > 80 ? 'bg-green-500' : trunk.health > 60 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${trunk.health}%` }}
                            />
                          </div>
                          <span className="text-white text-sm font-medium">{trunk.health}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {trunk.codec}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white text-sm">{trunk.concurrent}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
