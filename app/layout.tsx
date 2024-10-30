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
          <div className='flex flex-col items-center min-h-screen bg-[#ededed]'>
            <div className='w-full flex-1 flex justify-center p-4 bg-white'>
              <StockSelector />
            </div>
            {children}
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
