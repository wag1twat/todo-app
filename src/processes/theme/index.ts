import { chakra, ColorMode, extendTheme, forwardRef, HTMLChakraProps, Theme, ThemingProps, useStyleConfig } from "@chakra-ui/react";
import React from "react";

interface StyleOptions {
  theme: Theme
  colorMode: ColorMode
  colorScheme: string
}

const HeaderLayout = forwardRef<HTMLChakraProps<'div'> & ThemingProps, 'div'>((props, ref) => {
    const styles = useStyleConfig('Header')
    return React.createElement(chakra.div, { __css: styles, ...props, ref });
});
const MainLayout = forwardRef<HTMLChakraProps<'main'> & ThemingProps, "main">((props, ref) => {
    const styles = useStyleConfig('Main')
    return React.createElement(chakra.main, { __css: styles, ...props, ref });
});
const ContentLayout = forwardRef<HTMLChakraProps<'div'> & ThemingProps, "div">((props, ref) => {
    const styles = useStyleConfig('Content')
    return React.createElement(chakra.div, { __css: styles, ...props, ref });
});
const ScrollLayout = forwardRef<HTMLChakraProps<'div'> & ThemingProps, "div">((props, ref) => {
    const styles = useStyleConfig('Scroll')
    return React.createElement(chakra.div, { __css: styles, ...props, ref });
});

const components = {
    Header: {
        baseStyle(props: StyleOptions) {
            const { theme } = props

            const zIndices = Object.values(theme.zIndices).filter(
                (value) => typeof value === "number"
            ) as number[];
            const maxZIndex = Math.max(...zIndices) + 1;

            return {
                justifyContent: "flex-end",
                p: 6,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: "#fff",
                zIndex: maxZIndex,
                height: 20,
            }
        }
    },
    Main: {
        baseStyle(props: StyleOptions) {
            // @ts-ignore // TODO: write declation for theme type
            const headerStyles = props.theme.components.Header.baseStyle(props)

            return {
                mt: headerStyles.height, 
                mx: 6, 
                mb: 6,
                height: `calc(100vh - ${(headerStyles.height) * 4}px)`,
            }
        }
    },
    Content: {
        baseStyle(props: StyleOptions) {
            return {
                width: "100%",
                maxWidth: "1366px",
                mx: "auto",
                justifyContent: "center",
                display: 'flex',
                height: 'inherit',
                pt: 1
            }
        }
    },
    Scroll: {
        baseStyle(props: StyleOptions){
            return {
                overflow: 'overlay',
                '&::-webkit-scrollbar': {
                    backgroundColor:' rgba(0,0,0,0)',
                    width: '16px',
                    height: '16px',
                    zIndex: '999999',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderRadius: '16px',
                    border: '0px solid #fff',
                },
                '&::-webkit-scrollbar-button': {
                    display: 'none',
                },
                '&:hover::-webkit-scrollbar-thumb': {
                    backgroundColor: '#a0a0a5',
                    border: '4px solid #fff',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#a0a0a5',
                    border: '4px solid #f4f4f4'
                }
            }
        }
    }
}


const theme = extendTheme({
    styles: {
        global: {
            body: {
                overflow: 'hidden'
            }
        }
    },
    components
})

export { HeaderLayout, MainLayout, ContentLayout, ScrollLayout }
export default theme
