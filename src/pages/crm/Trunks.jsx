import React, { useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { trunks } from '../../data/crmMock';
import { useToast } from '../../hooks/use-toast';

const Trunks = () => {
  const { toast } = useToast();
  const [trunkList] = useState(trunks);

  const handleAction = (action, trunkName) => {
    toast({
      title: `${action} işlemi`,
      description: `${trunkName} için ${action} işlemi başlatıldı.`,
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Trunk Yönetimi" 
        subtitle="SIP trunk'larınızı yönetin ve izleyin"
      />
      
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus size={18} className="mr-2" />
              Yeni Trunk Ekle
            </Button>
            <Button variant="outline" className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]">
              <RefreshCw size={18} className="mr-2" />
              Yenile
            </Button>
          </div>
        </div>

        {/* Trunks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trunkList.map((trunk) => (
            <Card key={trunk.id} className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] hover:border-blue-500/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{trunk.name}</h3>
                    <p className="text-sm text-[rgb(161,161,170)]">{trunk.provider}</p>
                  </div>
                  <Badge className={`${
                    trunk.status === 'online' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : trunk.status === 'warning'
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {trunk.status === 'online' ? 'Online' : trunk.status === 'warning' ? 'Uyarı' : 'Offline'}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgb(161,161,170)]">Sağlık Durumu</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-[rgb(38,40,42)] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            trunk.health > 80 ? 'bg-green-500' : trunk.health > 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${trunk.health}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium w-12 text-right">{trunk.health}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgb(161,161,170)]">Ses Codec</span>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {trunk.codec}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgb(161,161,170)]">Eşzamanlı Çağrı</span>
                    <span className="text-white text-sm font-medium">{trunk.concurrent}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgb(161,161,170)]">IP Adresi</span>
                    <span className="text-white text-sm font-mono">{trunk.ip}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-[rgb(63,63,63)] text-white hover:bg-blue-500/10 hover:border-blue-500"
                    onClick={() => handleAction('Düzenle', trunk.name)}
                  >
                    <Edit size={16} className="mr-2" />
                    Düzenle
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[rgb(63,63,63)] text-red-400 hover:bg-red-500/10 hover:border-red-500"
                    onClick={() => handleAction('Sil', trunk.name)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trunks;