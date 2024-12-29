import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    XIcon,
    WhatsappIcon,
    EmailIcon,
} from "react-share";

function ShareButtons({ property }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">
                Share this property:
            </h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={`#${property.type}ForRent`}
                />
                <FacebookIcon size={40} round={true} />

                <TwitterShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={[`${property.type.replace(/\s/g, "")}ForRent`]}
                />
                <XIcon size={40} round={true} />

                <WhatsappShareButton
                    url={shareUrl}
                    quote={property.name}
                    separator=":: "
                />
                <WhatsappIcon size={40} round={true} />

                <EmailShareButton
                    url={shareUrl}
                    subject={property.name}
                    body={`Check out this property: ${shareUrl}`}
                />
                <EmailIcon size={40} round={true} />
            </div>
        </>
    );
}

export default ShareButtons;
