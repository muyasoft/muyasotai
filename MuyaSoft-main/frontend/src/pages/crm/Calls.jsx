import React, { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { callRecords } from '../../data/crmMock';

const Calls = () => {
  const [records] = useState(callRecords);

  const getStatusBadge = (status) => {
    const statusMap = {
      'answered': { text: 'Cevaplandı', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'no-answer': { text: 'Cevapsız', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'busy': { text: 'Meşgul', class: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
      'failed': { text: 'Başarısız', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
    };
    return statusMap[status] || statusMap['failed'];
  };

  const getRiskBadge = (risk) => {
    const riskMap = {
      'low': { text: 'Düşük', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'medium': { text: 'Orta', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'high': { text: 'Yüksek', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
    };
    return riskMap[risk] || riskMap['low'];
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Çağrı Kayıtları (CDR)" 
        subtitle="Detaylı çağrı geçmişi ve AI analizi"
      />
      
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-1 max-w-md space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(161,161,170)]" size={18} />
              <Input
                placeholder="Numara, CDR ID ara..."
                className="pl-10 bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
              />
            </div>
            <Button variant="outline" className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]">
              <Filter size={18} />
            </Button>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Download size={18} className="mr-2" />
            Rapor İndir
          </Button>
        </div>

        {/* Call Records Table */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">CDR ID</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Arayan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Aranan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Tarih/Saat</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Süre</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Durum</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Risk</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">AI Özeti</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const status = getStatusBadge(record.status);
                    const risk = getRiskBadge(record.spamRisk);
                    return (
                      <tr key={record.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgb(38,40,42)] transition-colors">
                        <td className="py-4 px-6">
                          <span className="text-blue-400 font-mono text-sm">{record.id}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-medium">{record.caller}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-medium">{record.callee}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[rgb(161,161,170)] text-sm">{record.timestamp}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-mono">{record.duration}</span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={status.class}>
                            {status.text}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={risk.class}>
                            {risk.text}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-[rgb(161,161,170)] text-sm truncate">{record.aiSummary}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calls;