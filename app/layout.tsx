import '@/app/ui/global.css';
import AppStateProvider from '@/state/AppStateProvider';
import StockSelector from '@/components/StockSelector';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AppStateProvider>
          <div className='flex flex-col items-center h-screen bg-[#ededed] overflow-auto'>
            <div className='self-stretch flex justify-center p-4 bg-white sticky top-0 z-50'>
              <StockSelector />
            </div>
            {children}
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
