import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { SliderDetail, BoxInfo, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } =
  icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();
  //console.log(posts?.images?.image);
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);
  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div className="w-full flex gap-8">
      <div className="w-[70%]">
        <SliderDetail
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-red-600">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-1">
              <span>Chuyên mục: </span>
              <span
                onClick={handleFilterLabel}
                className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer"
              >
                {posts[0]?.labelData?.value}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <HiLocationMarker color="#2563eb" />
              <span>{posts[0]?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <TbReportMoney />
                <span className="font-semibold text-lg text-green-600">
                  {posts[0]?.attributes?.price}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <RiCrop2Line />
                <span>{posts[0]?.attributes?.acreage}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsStopwatch />
                <span>{posts[0]?.attributes?.published}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsHash />
                <span>{posts[0]?.attributes?.hashtag}</span>
              </span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {/* {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })} */}
              {/* {JSON.parse(posts[0]?.description)} */}
              {posts[0]?.description.replace(/[\[\]"]/g, "")}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table>
              <tbody>
                <tr>
                  <td className="border p-4">Mã tin</td>
                  <td className="border p-4">{posts[0]?.overviews?.code}</td>
                </tr>
                <tr>
                  <td className="border p-4">Khu vực</td>
                  <td className="border p-4">{posts[0]?.overviews?.area}</td>
                </tr>
                {/* <tr>
                  <td className="border p-4">Loại tin rao</td>
                  <td className="border p-4">{posts[0]?.overviews?.type}</td>
                </tr> */}
                <tr>
                  <td className="border p-4">Đối tượng</td>
                  <td className="border p-4">{posts[0]?.overviews?.target}</td>
                </tr>
                <tr>
                  <td className="border p-4">Gói tin</td>
                  <td className="border p-4">{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr>
                  <td className="border p-4">Ngày đăng</td>
                  <td className="border p-4">{posts[0]?.overviews?.created}</td>
                </tr>
                <tr>
                  <td className="border p-4">Ngày hết hạn</td>
                  <td className="border p-4">{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table>
              <tbody>
                <tr>
                  <td className="border p-4">Liên hệ</td>
                  <td className="border p-4">{posts[0]?.user?.name}</td>
                </tr>
                <tr>
                  <td className="border p-4">Điện thoại</td>
                  <td className="border p-4">{posts[0]?.user?.phone}</td>
                </tr>
                <tr>
                  <td className="border p-4">Zalo</td>
                  <td className="border p-4">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
          </div> */}
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <BoxInfo userData={posts[0]?.user} />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPost;
